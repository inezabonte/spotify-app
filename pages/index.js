import { useEffect, useState } from "react";
import { getAccessToken } from "../lib/spotify";

export default function Home() {
	const [token, setToken] = useState(null);
	useEffect(() => {
		setToken(getAccessToken());
	}, []);
	return (
		<div>
			{!token ? (
				<a href="http://localhost:3000/api/auth/login">Login to Spotify</a>
			) : (
				<h1>Logged In</h1>
			)}
		</div>
	);
}
