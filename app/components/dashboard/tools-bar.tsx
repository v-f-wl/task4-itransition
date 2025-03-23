'use client'
import IDelete from "../icons/delete-icon";
import ILock from "../icons/lock-icon";
import IUnlock from "../icons/unlock-icon";
import { Button } from "../UI/button";
import Tooltip from "../UI/tooltip";


interface ToolsBarProps{
  handleBlock: ()=> void,
  handleUnblock: ()=> void,
  handleDelete: ()=> void,
}
const ToolsBar = ({
  handleBlock,
  handleUnblock,
  handleDelete,
}: ToolsBarProps) => {
  return ( 
    <div className="flex gap-4">
      <Tooltip text="Block selected users">
        <Button 
          intent='primary' 
          size="medium" 
          label='Block'
          icon={<ILock/>} 
          onClick={handleBlock}
          />
      </Tooltip>
      <Tooltip text="Unblock selected users">
        <Button 
          intent='secondary' 
          icon={<IUnlock/>} 
          onClick={handleUnblock}
          />
      </Tooltip>
      <Tooltip text="Delete selected users">
        <Button 
          intent='secondaryRed' 
          icon={<IDelete/>} 
          onClick={handleDelete}
        />
      </Tooltip>
    </div>
   );
}
 
export default ToolsBar;