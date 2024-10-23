import { useContext, useState } from "react";
import { ContextProvider } from "../Context/AppProvider";
import { IoSyncOutline } from "react-icons/io5";
import Button from "./Button";


const PlaylistOverview = () => {
	const { playlistItems } = useContext(ContextProvider)
	const [selectedVideo, setSelectedVideo] = useState(null)


	return (
		<div
			className={`w-4/12 bg-[#27272F] rounded-xl p-4 h-[530px]`}
		>
			<p>Tumbnail Title</p>
			<button className="my-2 p-2 border-[1px] border-gray-700 w-full rounded-xl text-left">Get Sporty in Style</button>
			<p>Product List</p>


			<div className="overflow-y-auto h-[350px] scrollbar-hide">
				{
					playlistItems?.map((e, index) => {
						return (
							<div
								key={index}
								className="cursor-pointer border-[1px] border-white bg-cover relative rounded-xl my-4"
								onClick={() => { setSelectedVideo(e.id) }}
							>
								<div
									className="absolute p-2 font-bold bg-gray-900 bg-opacity-80 right-0 rounded-tr-lg rounded-bl-xl"
								>
									<input
										type="radio"
										id={e.snippet.position}
										name="selected-video"
										value={e.id}
										checked={e.id === selectedVideo}
										onChange={() => { setSelectedVideo(e.id) }}
									/>
								</div>
								<div className="flex gap-3 m-2">
									<img src={e.snippet.thumbnails.high.url} alt="video_thumbnail" className="rounded-lg w-28 h-20" />
									<div className="flex flex-col gap-4 my-2">
										<p className="text-sm truncate max-w-[200px] overflow-hidden">{e.snippet.title}</p>
										<p className="text-sm truncate max-w-[200px] overflow-hidden">{e.snippet.description}</p>
									</div>
								</div>
							</div>
						)
					})
				}
			</div>

			{playlistItems && <div className="flex justify-center mt-2">
				<Button
					border_color="border-blue-700"
					bg_color="bg-blue-700"
					text_color={"text-gray-300"}
					padding={"p-2"}
					icon={<IoSyncOutline className="text-white text-xl" />}
					text="Update Playlist"
				/>
			</div>}
		</div>
	)
}

export default PlaylistOverview;