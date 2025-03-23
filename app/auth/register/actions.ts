'use server'
import { db } from "@/database/drizzle"
import { user } from "@/database/schema"
import { AuthFormData } from "@/types"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function createUser({
  firstName, 
  secondName, 
  email, 
  password
}: AuthFormData){
  try {
    const salt = await bcrypt.genSalt(3)
    const hash = await bcrypt.hash(password, salt)

    const newUser = await db.insert(user).values({
      fullName: `${firstName} ${secondName}`,
      email,
      password: hash,
    })
    .returning({ id: user.id, email: user.email })
    if (!newUser[0]) {
      return { success: false, message: "Failed to create a user" }
    }
    const jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
      throw new Error("JWT_SECRET doesn't exist")
    }

    const token = jwt.sign(
      { id: newUser[0].id, email: newUser[0].email },
      jwtSecret,
      { expiresIn: "7d" }
    )
    return { success: true, message: "User created", id: newUser[0].id, token }
  } catch (error: any) {
    if (error.code === "23505") {
      return { success: false, message: "E-mail is already in use" }
    }
    if (error.code === "22001") {
      return { success: false, message: "The sum of the first name and last name cannot exceed 99 characters." }
    }
    console.log(error)
    return { success: false, message: "Server error"}
  }
}