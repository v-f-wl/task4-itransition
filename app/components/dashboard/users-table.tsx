'use client'
import { useEffect, useMemo, useRef, useState } from "react";
import { Title } from "../UI/title";
import ToolsBar from "./tools-bar";
import UserItem from "./user-item";
import { CheckedUserData, UserData } from "@/types";
import Tooltip from "../UI/tooltip";
import { Button } from "../UI/button";
import ISort from "../icons/sort-icon";
import Cookies from "js-cookie";
import { handleUsersAction } from "@/utils/usersActions";
import { addIsChecked, sortUsers } from "@/utils/processUsers";

interface Props {
  initialUsers: UserData[];
}

const UsersTable = ({initialUsers}: Props) => {
  const [users, setUsers] = useState<CheckedUserData[]>([])
  const [selectedUsersId, setSelectedUserId] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [isLoading, setIsLoading] = useState(false)
  const userId = Cookies.get('id')
  const userToken = Cookies.get('token')

  useEffect(() => {
    const usersWithChecked = addIsChecked(initialUsers)
    const sortedUsers = sortUsers(usersWithChecked, sortOrder)
    setUsers(sortedUsers)
  },[initialUsers])
  const checkboxRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate =
        selectedUsersId.length > 0 && selectedUsersId.length < users.length && users.length !== 0
    }
  }, [selectedUsersId, users])

  const handleSortUsers = () => {
    setSortOrder(prev => {
      const newSortOrder = prev === 'asc' ? 'desc' : 'asc'
      const sortedUsers = sortUsers(users, newSortOrder)
      setUsers(sortedUsers)
      return newSortOrder
    })
  }
  const updateUsersIdState = (id: string) => {
    setSelectedUserId(prev => {
      if(selectedUsersId.includes(id)){
        return prev.filter(userId => userId !== id)
      }else{
        return [...prev, id]
      }
    })
  }
  
  const handleCheckBoxToggle = (id: string) => {
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map(user =>{
        if(user.id === id){
          return {...user, isChecked: !user.isChecked}
        }
        return user
      }
      )
      return [...updatedUsers]
    })
    updateUsersIdState(id)
  }

  const handleAllCheckBoxesToggle = () => {
    if (selectedUsersId.length === 0) {
      const allIds = users.map(item => item.id)
      setUsers(prev => prev.map(item => ({ ...item, isChecked: true })))
      setSelectedUserId(allIds)
      return
    }
  
    setUsers(prev => prev.map(item => ({ ...item, isChecked: false })))
    setSelectedUserId([])
  }
  const handleBlockUsers = () => {
    handleUsersAction('block', userId, userToken, selectedUsersId, isLoading, setIsLoading, setUsers, setSelectedUserId, sortOrder)
  };
  
  const handleUnblockUsers = () => {
    handleUsersAction('unblock', userId, userToken, selectedUsersId, isLoading, setIsLoading, setUsers, setSelectedUserId, sortOrder)
  };
  
  const handleDeleteUsers = () => {
    handleUsersAction('delete', userId, userToken, selectedUsersId, isLoading, setIsLoading, setUsers, setSelectedUserId, sortOrder)
  };
  
  const renderUsers = useMemo(() => {
    return users.map(user => <UserItem key={user.id} user={user} onSelect={handleCheckBoxToggle} />)
  }, [users, selectedUsersId])


  return ( 
    <div 
      className="w-full lg:w-5/8 mt-4 sm:mt-8 sm:mx-auto"
    >
      <Title label="Account Status Overview"/>
      <div className="mt-2 sm:mt-6 bg-neutral-100 p-2 rounded-xl">
        <ToolsBar
          handleBlock={handleBlockUsers}
          handleUnblock={handleUnblockUsers}
          handleDelete={handleDeleteUsers}
        />
      </div>
      <div className="overflow-x-auto mt-2">
        <table className="w-full">
          <thead className="border-b border-neutral-200">
            <tr >
              <th 
                onClick={handleAllCheckBoxesToggle}
                className="w-4 p-2"
              >
                <input
                  ref={checkboxRef}
                  type="checkbox" 
                  checked={users.length === selectedUsersId.length && selectedUsersId.length !== 0} 
                  onChange={() => {}}
                />
              </th>
              <th className="max-w-1/4 overflow-hidden">
                <Tooltip text="Sort by name">
                  <Button
                    label="Name"
                    icon={<ISort/>}
                    intent="linear"
                    textStyle="bold"
                    size="none"
                    onClick={handleSortUsers}
                  />
                </Tooltip>
              </th>
              <th className="max-w-1/4 overflow-hidden">Email</th>
              <th>Status</th>
              <th>Last Active</th>
            </tr>
          </thead>
          <tbody>{renderUsers}</tbody>
        </table>
      </div>
    </div>
  );
}
 
export default UsersTable;