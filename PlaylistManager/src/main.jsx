import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AppProvider from './Context/AppProvider.jsx'

createRoot(document.getElementById('root')).render(
	<GoogleOAuthProvider
		clientId="442456466007-3rf9antk46qgrjkn7b127s7905ig8mnf.apps.googleusercontent.com"
	>
		<AppProvider>
			<App />
		</AppProvider>
	</GoogleOAuthProvider>
)