import { createContext, useState } from "react"

export const ContextProvider = createContext();
const AppProvider = ({ children }) => {
	const [isAuth, setIsAuth] = useState(localStorage.getItem("token") ? true : false)
	const [token, setToken] = useState(localStorage.getItem("token"))
	const [userName, setUserName] = useState(localStorage.getItem("token") ? localStorage.getItem("name") : "")
	const [profilePic, setProfilePic] = useState(localStorage.getItem("token") ? localStorage.getItem("profilePic") : "")
	const [showUserSection, setShowUserSection] = useState(false);
	const [playlistItems, setPlaylistItems] = useState(null)
	const [playlistData, setPlaylistData] = useState([])
	return (
		<ContextProvider.Provider
			value={{ isAuth, setIsAuth, token, setToken, userName, setUserName, profilePic, setProfilePic, showUserSection, setShowUserSection, playlistItems, setPlaylistItems, playlistData, setPlaylistData }}
		>
			{children}
		</ContextProvider.Provider>
	)
}

export default AppProvider