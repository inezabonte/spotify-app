import axios from "axios";
import querystring from "querystring";

const clientId = process.env.CLIENT_ID;
const redirectUri = process.env.REDIRECT_URI;
const clientSecret = process.env.CLIENT_SECRET;

export default async function (req, res) {
	const code = req.query.code || null;

	axios({
		method: "post",
		url: "https://accounts.spotify.com/api/token",
		data: querystring.stringify({
			grant_type: "authorization_code",
			code,
			redirect_uri: redirectUri,
		}),
		headers: {
			"content-type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${new Buffer.from(
				`${clientId}:${clientSecret}`
			).toString("base64")}`,
		},
	})
		.then((response) => {
			if (response.status === 200) {
				const { access_token, refresh_token, expires_in } = response.data;

				const queryParams = querystring.stringify({
					access_token,
					refresh_token,
					expires_in,
				});
				res.redirect(`http://localhost:3000/?${queryParams}`);
			} else {
				res.redirect(`/?${querystring.stringify({ error: "invalid_token" })}`);
			}
		})
		.catch((err) => {
			res.send(err);
		});
}
