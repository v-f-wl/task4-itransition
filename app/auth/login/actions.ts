'use server'
import { db } from "@/database/drizzle"
import { user } from "@/database/schema"
import { LoginFormData } from "@/types"
import bcrypt from 'bcrypt'
import { sql } from "drizzle-orm"
import jwt from 'jsonwebtoken'

export async function loginUser({
  email, 
  password
}: LoginFormData){
  try {
    const userData = await db.select().from(user).where(sql`${user.email} = ${email}`)
    if(!userData || userData.length === 0){
      return { success: false, message: "User not found" }
    }
    const isValidPassword = await bcrypt.compare(password, userData[0].password)
    
    if(userData[0].isBlocked){
      return { success: false, message: "User is blocked" }
    }
    if(!isValidPassword){
      return { success: false, message: "Incorrect password" }
    }
    const jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
      throw new Error('JWT secret is not defined')
    }
    const token = jwt.sign(
      {id: userData[0].id}, 
      jwtSecret,
      {expiresIn: "7d"}
    )

    await db.update(user)
      .set({lastActivityDate: new Date() })
      .where(sql`${user.id} = ${userData[0].id}`)
      
    return { success: true, message: "User found", id: userData[0].id, token }
  } catch (error: any) {
    return { success: false, message: "Server error"}
  }
}