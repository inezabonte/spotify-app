import querystring from "querystring";
import generateString from "password-generator";
import { serialize } from "cookie";

const clientId = process.env.CLIENT_ID;
const redirectUri = process.env.REDIRECT_URI;

const stateKey = "spotify_auth_state";

export default function async(req, res) {
	const state = generateString(16, false);

	const scope = "user-read-private user-read-email";

	const queryParams = querystring.stringify({
		client_id: clientId,
		response_type: "code",
		redirect_uri: redirectUri,
		state,
		scope,
	});

	res
		.setHeader("Set-Cookie", serialize(stateKey, state))
		.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
}
