import Cookies from "js-cookie";
import { redirect } from "next/navigation";
export const redirectUser = () => {
  Cookies.remove('id')
  Cookies.remove('token')
  redirect('/auth/register')
}