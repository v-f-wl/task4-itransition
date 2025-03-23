'use client'
import { redirect } from "next/navigation";
import ILogOut from "./icons/log-out";
import { Button } from "./UI/button";
import Logo from "./UI/logo";
import Tooltip from "./UI/tooltip";
import Cookies from "js-cookie";

const Header = () => {
  const handleLogOut = () => {
    Cookies.remove('id')
    Cookies.remove('token')
    redirect('/auth/login')
  }
  return ( 
    <header className="flex justify-between items-center">
      <Logo/>
      <Tooltip text="End your session">
        <Button
          label="Log Out"
          intent='linear'
          icon={<ILogOut/>}
          onClick={handleLogOut}
        />
      </Tooltip>
    </header>
  );
}
 
export default Header;