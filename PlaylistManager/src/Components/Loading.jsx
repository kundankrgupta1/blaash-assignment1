const Loading = () => {
	return (
		<div className="flex items-center justify-center gap-2">
			<div className="border-2 border-gray-200 border-t-2 border-t-blue-500 w-5 h-5 rounded-full animate-spin"></div>
			<p>Loading Playlist...</p>
		</div>
	);
};

export default Loading;
