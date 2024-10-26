import { useContext } from "react"
import { PiDotsThreeOutline } from "react-icons/pi"
import { RiPlayList2Fill } from "react-icons/ri"
import { ContextProvider } from "../Context/AppProvider"
import Loading from "./Loading"
import Button from "./Button"
import { MdOutlineGetApp } from "react-icons/md"

const Playlist = ({ isLoading, isError, fetchData, errorMessage }) => {

	const { playlistData, setPlaylistItems } = useContext(ContextProvider)

	return (
		<>
			<div className="bg-[#27272F] w-8/12 rounded-xl p-4 h-[530px] flex justify-center items-center">
				{isLoading && <Loading />}
				{!isLoading && isError &&
					<div className="flex flex-col justify-center items-center gap-4">
						<h1 className="text-3xl font-bold">Error: {errorMessage}</h1>
						<Button
							border_color="border-blue-700"
							bg_color="bg-blue-700"
							text_color={"text-gray-300"}
							padding={"p-2"}
							icon={<MdOutlineGetApp className="text-white text-xl" />}
							text="fetch playlist again"
							onClick={() => { fetchData() }}
						/>
					</div>
				}
				{!isLoading && !isError && playlistData?.length === 0 &&
					<div className="flex flex-col justify-center items-center gap-4">
						<h1 className="text-3xl font-bold">No playlist found</h1>
						<Button
							border_color="border-blue-700"
							bg_color="bg-blue-700"
							text_color={"text-gray-300"}
							padding={"p-2"}
							icon={<MdOutlineGetApp className="text-white text-xl" />}
							text="fetch playlist"
							onClick={() => { fetchData() }}
						/>
					</div>
				}
				{!isLoading && !isError && playlistData?.length > 0 &&
					<div className="w-full h-full">
						<div className="grid grid-cols-3 gap-4">
							{
								playlistData?.map((e, index) => {
									return (
										<div
											key={index}
											className="cursor-pointer border-[1px] border-black h-40 bg-cover relative rounded-xl"
											style={{ backgroundImage: `url(${e.data.items[0].snippet.thumbnails.high.url})` }}
											onClick={() => { setPlaylistItems(e.data.items) }}
										>
											<div
												className="absolute p-2 font-bold bg-gray-900 bg-opacity-80 right-0 rounded-tr-lg rounded-bl-xl"
											>
												<PiDotsThreeOutline className="text-white text-2xl" />
											</div>
											<div className="absolute w-full bottom-0">
												<div
													className="bg-black bg-opacity-40 flex justify-start items-center gap-2 py-1"
												>
													<div className="bg-blue-700 w-6 rounded-tr-xl rounded-br-xl">&nbsp;</div>
													<h3 className="font-bold truncate max-w-[200px] overflow-hidden">{e.data.items[0].snippet.title}</h3>
												</div>
												<span
													className="bg-black flex gap-4 justify-center items-center p-2 rounded-bl-lg rounded-br-lg"
												>
													<RiPlayList2Fill /> {e.data.items.length} videos
												</span>
											</div>
										</div>
									)
								})
							}
						</div>
					</div>
				}
			</div>
		</>
	)
}

export default Playlist