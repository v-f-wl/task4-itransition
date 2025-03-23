import { Toaster } from "react-hot-toast";
import UsersTable from "./components/dashboard/users-table";
import Header from "./components/header";

export default function Home() {
	return (
		<div className="w-screnn h-screen p-4">
			<Toaster position="bottom-right"/>
			<Header/>
      <UsersTable />
		</div>
	);
}
