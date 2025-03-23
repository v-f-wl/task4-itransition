import { CheckedUserData, UserSettingsResponse } from "@/types";
import { redirectUser } from "./redirectUser";
import toast from "react-hot-toast";
import { blockUsers, deleteUsers, unblockUsers } from "@/app/components/dashboard/actions";
import { addIsChecked, sortUsers } from "./processUsers";
import { Dispatch, SetStateAction } from "react";

export const handleUsersAction = async (
  actionType: 'block' | 'unblock' | 'delete',
  userId: string | undefined,
  userToken: string | undefined,
  selectedUsersId: string[],
  isLoading: boolean,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setUsers: Dispatch<SetStateAction<CheckedUserData[]>>,
  setSelectedUserId: Dispatch<SetStateAction<string[]>>,
  sortOrder: 'asc' | 'desc',
) => {
  if (selectedUsersId.length === 0) return toast.error('No one selected')
  if (isLoading) return toast.error('Please wait until the current operation is completed')
  if (!userId || !userToken) return redirectUser() 

  setIsLoading(true)
  toast(`${actionType} in progress...`, {duration: 2500})
  let respons: UserSettingsResponse
  switch (actionType) {
    case 'block':
      respons = await blockUsers({ userId, userToken, usersList: selectedUsersId })
      break
    case 'unblock':
      respons = await unblockUsers({ userId, userToken, usersList: selectedUsersId })
      break
    case 'delete':
      respons = await deleteUsers({ userId, userToken, usersList: selectedUsersId })
      break
    default:
      throw new Error('Invalid action type')
  }

  setIsLoading(false)
  if (respons.users !== undefined) {
    const usersWithChecked = addIsChecked(respons.users)
    const sortedUsers = sortUsers(usersWithChecked, sortOrder)
    setUsers(sortedUsers)
    toast.success(respons.message)
    setSelectedUserId([])
    return
  }

  if (respons.redirect) redirectUser()
};
