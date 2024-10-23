import { BiGitMerge } from "react-icons/bi"
import { CiSearch } from "react-icons/ci"
import { MdOutlineContactSupport, MdOutlineGetApp } from "react-icons/md"
import { VscBellDot } from "react-icons/vsc"
import { useContext } from "react"
import { ContextProvider } from "../Context/AppProvider"
import Button from "./Button"

const Navbar = ({ fetchData }) => {
	const { isAuth, setIsAuth, userName, profilePic, setShowUserSection } = useContext(ContextProvider)
	return (
		<div className="h-20 p-4 rounded-lg bg-[#27272F] flex items-center justify-between">
			<div>
				<h1
					className="font-bold"
				>
					Design Studio
				</h1>
			</div>
			<div className="text-sm flex justify-between items-center gap-4">
				<Button
					border_color="border-blue-700"
					bg_color="bg-blue-700"
					text_color={"text-gray-300"}
					padding={"p-2"}
					icon={<MdOutlineGetApp className="text-white text-xl" />}
					text="fetch playlist"
					onClick={() => { fetchData() }}
				/>
				<Button
					border_color="border-blue-700"
					bg_color="none"
					padding={"p-2"}
					icon={<MdOutlineContactSupport />}
					text="fetch playlistx"
					text_color={"text-gray-300"}
				/>
				<Button
					border_color="border-blue-700"
					bg_color="none"
					padding={"p-2"}
					icon={<BiGitMerge />}
					text="product tour"
					text_color={"text-gray-300"}
				/>
				<div className="flex items-center justify-center border-[1px] border-gray-600 rounded-lg">
					<input type="text" className="bg-inherit outline-none p-[8px] pl-2 w-40" placeholder="Serach project..." />
					<button className="p-1 m-1 rounded-lg border-[1px] border-gray-600">
						<CiSearch className="text-lg" />
					</button>
				</div>
				<Button
					border_color="border-gray-600"
					bg_color="none"
					padding={"p-1"}
					icon={<VscBellDot className="text-gray-400 text-[24px]" />}
					text_color={"text-gray-300"}
				/>
				<div className="flex gap-2 items-center justify-center">
					<Button
						border_color="border-gray-600"
						bg_color="none"
						padding={"p-2"}
						text_color={"text-gray-300"}
						text={
							isAuth ? (
								<>
									<div className="flex items-center justify-between gap-2">
										<img src={profilePic ? profilePic : "https://i.ibb.co/McSv6YH/profile.png"} alt="user_profilePic" className="rounded-full w-5 h-5" />
										<span className="capitalize">{userName}</span>
									</div>
								</>
							) : ("Login / Singup")
						}
						onClick={() => { isAuth ? "" : setShowUserSection(true) }}
					/>
					{isAuth ? <Button
						onClick={() => {
							localStorage.removeItem("token");
							localStorage.removeItem("name");
							localStorage.removeItem("profilePic")
							setIsAuth(false)
						}}
						border_color="border-none"
						bg_color="bg-red-500 text-black"
						padding={"p-2"}
						text="Logout"
						text_color={"text-black"}
					/> : <></>}
				</div>
			</div>
		</div >
	)
}

export default Navbar