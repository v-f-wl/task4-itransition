'use server'
import { db } from "@/database/drizzle";
import { user } from "@/database/schema";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { eq, inArray } from "drizzle-orm";
 
interface BlockUsersFunction{
  userId: string,
  userToken: string,
  usersList: string[]
}
interface MyJwtPayload extends JwtPayload {
  id: string;
}

const verifyUser = ({userId, token}: {userId:string, token: string}) => {
  const jwtSecret = process.env.JWT_SECRET
  if (!jwtSecret) {
    throw new Error("JWT secret is not defined")
  }
  try {
    const decoded = jwt.verify(token, jwtSecret) as MyJwtPayload
    return decoded.id === userId
  } catch (error) {
    return false
  }
}

export async function getUsers() {
  try{
    const result = await db.select({
      id: user.id,
      fullName: user.fullName,
      isBlocked: user.isBlocked,
      email: user.email,
      lastActivityDate: user.lastActivityDate 
    }).from(user)
    return result
  }catch(error){
    return []
  }
}

export async function blockUsers({userId, userToken, usersList}: BlockUsersFunction) {
  try{
    const userRecord = await db
      .select()
      .from(user)
      .where(eq(user.id,(userId)))
      .limit(1)

    if (!userRecord.length) {
      return { success: false, message: "User not found", redirect: true }
    }

    const currentUser = userRecord[0]

    if (currentUser.isBlocked) {
      return { success: false, message: "Your account is blocked, unable to perform this action", redirect: true }
    }
    const isVerified = await verifyUser({ userId, token: userToken })

    if (!isVerified) {
      return { success: false, message: "Not verified", redirect: true}
    }
    const updatedUsers =  await db.update(user)
      .set({ isBlocked: true })
      .where(inArray(user.id, usersList))
      .returning()
  
    const isCurrentUserBlocked = updatedUsers.some((updatedUser) => updatedUser.id === userId)
    if (isCurrentUserBlocked) {
      return { success: false, message: "You blocked yourself", redirect: true }
    }
    const allUsers = await db.select().from(user)
  
    return { success: true, message: "Users blocked successfully", users: allUsers }
  }catch(error){
    return { success: false, message: "Somethin went wrong, try again"}
  }
}

export async function unblockUsers({userId, userToken, usersList}: BlockUsersFunction) {
  try{
    const userRecord = await db
        .select()
        .from(user)
        .where(eq(user.id,(userId)))
        .limit(1)

    if (!userRecord.length) {
      return { success: false, message: "User not found", redirect: true}
    }
    const currentUser = userRecord[0]

    if (currentUser.isBlocked) {
      return { success: false, message: "Your account is blocked, unable to perform this action", redirect: true }
    }
    const isVerified = await verifyUser({ userId, token: userToken })
    if (!isVerified) {
      return { success: false, message: "Not veriy", redirect: true}
    }

    await db.update(user)
      .set({ isBlocked: false })
      .where(inArray(user.id, usersList))
    const allUsers = await db.select().from(user)
  
    return { success: true, message: "Users unblocked successfully", users: allUsers }
  }catch(err){
    return { success: false, message: "Somethin went wrong, try again"}
  }
}

export async function deleteUsers({userId, userToken, usersList}: BlockUsersFunction) {
  try{
    const userRecord = await db
      .select()
      .from(user)
      .where(eq(user.id,(userId)))
      .limit(1)

    if (!userRecord.length) {
      return { success: false, message: "User not found", redirect: true }
    }

    const currentUser = userRecord[0]

    if (currentUser.isBlocked) {
      return { success: false, message: "Your account is blocked, unable to perform this action", redirect: true }
    }
    const isVerified = await verifyUser({ userId, token: userToken })

    if (!isVerified) {
      return { success: false, message: "Not verified", redirect: true}
    }
    const deletedUsers = await db.delete(user)
      .where(inArray(user.id, usersList))
      .returning()

    const isCurrentUserDeleted = deletedUsers.some((deletedUser) => deletedUser.id === userId);
    if (isCurrentUserDeleted) {
      return { success: false, message: "You cannot delete yourself", redirect: true };
    }

    const allUsers = await db.select().from(user)
  
    return { success: true, message: "Users deleted successfully", users: allUsers }
  }catch(error){
    return { success: false, message: "Somethin went wrong, try again"}
  }
}