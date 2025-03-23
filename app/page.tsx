import { Toaster } from "react-hot-toast";
import UsersTable from "./components/dashboard/users-table";
import Header from "./components/header";
import { getUsers } from "./components/dashboard/actions";
import Cookies from "js-cookie";

export default async function Home() {
	const users = await getUsers()

	return (
		<div className="w-screnn h-screen p-4">
			<Toaster position="bottom-right"/>
			<Header/>
      <UsersTable initialUsers={users} />
		</div>
	);
}
