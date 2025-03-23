import { CheckedUserData, UserData } from "@/types";

export function processUsers(users: UserData[], sortOrder: 'asc' | 'desc'): CheckedUserData[] {
  const usersWithChecked = users.map(user => ({
    ...user,
    isChecked: false,
  }))

  return usersWithChecked.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.fullName.localeCompare(b.fullName)
    }
    return b.fullName.localeCompare(a.fullName)
  })
}
export function addIsChecked(users: UserData[]): CheckedUserData[] {
  return users.map(user => ({
    ...user,
    isChecked: false,
  }))
}

export function sortUsers(users: CheckedUserData[], sortOrder: 'asc' | 'desc'): CheckedUserData[] {
  return [...users].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.fullName.localeCompare(b.fullName)
    }
    return b.fullName.localeCompare(a.fullName)
  })
}