import { useContext, useState } from "react";
import { ContextProvider } from "../Context/AppProvider";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../Firebase";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Login = () => {
	const { setIsAuth, setToken, setUserName, setProfilePic, showUserSection, setShowUserSection } = useContext(ContextProvider);
	const [toggle, setToggle] = useState(true);
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [message, setMessage] = useState("")
	const userLoginRegistration = async (e) => {
		e.preventDefault();
		try {
			if (toggle) {
				const loginRes = await axios.post(`http://localhost:8080/login`, { email, password })
				console.log("2", loginRes.data.message)
				setIsAuth(true);
				setUserName(loginRes.data.data.name);
				setToken(loginRes.data.token);
				localStorage.setItem("token", loginRes.data.token)
				localStorage.setItem("name", loginRes.data.data.name)
				localStorage.setItem("profilePic", loginRes.data.data.profilePic)
				setProfilePic(loginRes.data.data.profilePic)
				setMessage(loginRes.data.message)
				if (loginRes.data.success === true) {
					setTimeout(() => {
						setShowUserSection(false);
						setMessage("");
					}, 1000)
				}
				setEmail("")
				setPassword("")
			} else {
				// firebase method for registration (just for learning...)
				const db = getDatabase(app);
				set(ref(db, `user/${Date.now()}`), {
					id: Date.now(),
					name,
					email,
					password
				})
				// localhost method
				const RegRes = await axios.post(`http://localhost:8080/reg`, { name, email, password, profilePic: "https://i.ibb.co/McSv6YH/profile.png" })
				setMessage(RegRes.data.message)
				if (RegRes.data.success === true) {
					setTimeout(() => {
						setToggle(!toggle)
						setMessage("")
					}, 2000)
				}
			}
		} catch (error) {
			console.log("Error:", error.message)
			setMessage(error.message)
			setTimeout(() => {
				setMessage("")
			}, 2000)
		}
	}

	return (
		<div
			className={`${showUserSection ? "block" : "hidden"} fixed bg-black bg-opacity-70 flex justify-center items-center top-0 left-0 h-full w-full`}
		>
			<div className={`w-full max-w-80 mx-auto shadow-lg p-8 bg-white text-black rounded-lg`}>
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-semibold text-center">{toggle ? "Login" : "Registration"}</h1>
					<button className="float-right"
						onClick={() => setShowUserSection(false)}
					>
						<IoMdCloseCircleOutline className="text-2xl hover:text-red-600" />
					</button>
				</div>
				{toggle ? (
					<>
						<form onSubmit={userLoginRegistration}>
							<div className="mb-4">
								<label htmlFor="email" className="block text-sm font-medium text-gray-700">
									Email:
								</label>
								<input
									required
									type="email"
									value={email}
									className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="mb-6">
								<label htmlFor="password" className="block text-sm font-medium text-gray-700">
									Password:
								</label>
								<input
									required
									type="password"
									value={password}
									className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<button
								className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition mb-4"
								type="submit"
							>
								Login
							</button>
						</form>
						{message && <p>{message}</p>}
						<button
							type="button"
							className="w-full text-indigo-600 hover:underline text-sm"
							onClick={() => setToggle(!toggle)}
						>
							Create a new account
						</button>
					</>
				) : (
					<>
						<form onSubmit={userLoginRegistration}>
							<div className="mb-4">
								<label htmlFor="name" className="block text-sm font-medium text-gray-700">
									Name:
								</label>
								<input
									required
									type="text"
									value={name}
									className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="mb-4">
								<label htmlFor="email" className="block text-sm font-medium text-gray-700">
									Email:
								</label>
								<input
									required
									type="email"
									value={email}
									className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="mb-6">
								<label htmlFor="password" className="block text-sm font-medium text-gray-700">
									Password:
								</label>
								<input
									required
									type="password"
									value={password}
									className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<button
								className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition mb-4"
								type="submit"
							>
								Create Account
							</button>
						</form>
						{message && <p>{message}</p>}
						<button
							type="button"
							className="w-full text-indigo-600 hover:underline text-sm"
							onClick={() => setToggle(!toggle)}
						>
							Already have an account? Login
						</button>
					</>
				)}
				<hr className="my-4" />
				<h1 className="text-xl font-semibold mb-6 text-center">Login with Social</h1>
				<GoogleLogin
					onSuccess={credentialResponse => {
						const decodeData = jwtDecode(credentialResponse.credential)
						setIsAuth(true)
						setToken(credentialResponse.credential)
						setUserName(decodeData.name)
						setProfilePic(decodeData.picture)
						localStorage.setItem("token", credentialResponse.credential)
						localStorage.setItem("name", decodeData.name)
						localStorage.setItem("profilePic", decodeData.picture)
						if (credentialResponse.credential) {
							setMessage("Login Successful")
							setTimeout(() => {
								setShowUserSection(false)
							}, 2000)
						}
					}}
					onError={() => {
						console.log('Login Failed');
					}}
				/>
			</div>
		</div>
	);
};

export default Login;
