import { MdInsertLink } from "react-icons/md";
import SideNavbar from "./Components/SideNavbar";
import Navbar from "./Components/Navbar";
import Playlist from "./Components/Playlist";
import PlaylistOverview from "./Components/PlaylistOverview";
import Login from "./Components/Login";
import { useContext, useState } from "react";
import { ContextProvider } from "./Context/AppProvider";
import axios from "axios";
import Button from "./Components/Button";

const App = () => {

	const { setPlaylistData } = useContext(ContextProvider);
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")


	const api_key = "AIzaSyD8L08mVosfY3vQybSsfyBnBEwAklw0JcI"

	const playlistIds = [
		"PLDzeHZWIZsTo0wSBcg4-NMIbC0L8evLrD",
		"PLfEr2kn3s-brb-vHE-c-QCUq-nFwDYtWu",
		"PLfEr2kn3s-brmujLuaVPA_FTkflKbMc5x",
		"PLfEr2kn3s-br9ZFmejfLhAgMbGgbpdof8",
		"PLbtI3_MArDOkXRLxdMt1NOMtCS-84ibHH",
		"PLu71SKxNbfoDOf-6vAcKmazT92uLnWAgy"
	]

	const fetchData = async () => {
		setIsLoading(true)
		try {
			const res = playlistIds.map(el => axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=${el}&key=${api_key}`)
			)
			const responses = await Promise.all(res)
			console.log(responses)
			setPlaylistData(responses)
			setIsLoading(false)
			setIsError(false)
		} catch (error) {
			console.log(error)
			setErrorMessage(error.message)
			setIsError(true)
			setIsLoading(false)
		}
	}



	return (
		<div className="bg-slate-950 max-w-[1520px] p-4 m-auto flex gap-8">
			<SideNavbar />
			<div
				className="text-white w-full"
			>
				<Navbar
					fetchData={fetchData}
				/>
				<div className="flex justify-between items-center my-3">
					<h3>Product Playlist</h3>
					<Button
						border_color="border-blue-700"
						bg_color="bg-blue-800"
						padding={"p-2"}
						icon={<MdInsertLink className="text-xl" />}
						text="Generate code"
					/>
				</div>
				<div className="flex gap-4 justify-between items-start">
					<Playlist fetchData={fetchData} errorMessage={errorMessage} isLoading={isLoading} isError={isError} />
					<PlaylistOverview />
				</div>
				<Login />
			</div>
		</div>
	)
}

export default App;
