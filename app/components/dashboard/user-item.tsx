'use client'
import { CheckedUserData } from "@/types";
import Tooltip from "../UI/tooltip";
import { formatDistanceToNow } from 'date-fns'


interface UserRowProps {
  user: CheckedUserData ;
  onSelect: (id: string) => void;
}
const UserItem = ({ user, onSelect} : UserRowProps) => {
  return ( 
    <tr   
      onClick={() => {onSelect(user.id)}}
      className={`border-b border-neutral-200 ${user.isBlocked && 'bg-red-400/10'}`}
    >
      <td className="p-2">
        <input type="checkbox" checked={user.isChecked} onChange={() => {}}/>
      </td>
      <td>{user.fullName}</td>
      <td className={` ${user.isBlocked && 'opacity-35'}`}>{user.email}</td>
      <td className={`${user.isBlocked ? 'text-red-400' : 'text-green-400'}`}>
        {user.isBlocked ? 'Blocked' : 'Active'}
      </td>
      <td className="!cursor-pointer">
        {user.lastActivityDate &&(
          <Tooltip text={user.lastActivityDate.toString()}>
            {formatDistanceToNow(user.lastActivityDate, { addSuffix: true })}
          </Tooltip>
        )}
      </td>
    </tr>
  );
}
 
export default UserItem;