import axios from "axios";
import querystring from "querystring";

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

export default function (req, res) {
	const { refresh_token } = req.query;

	axios({
		method: "post",
		url: "https://accounts.spotify.com/api/token",
		data: querystring.stringify({
			grant_type: "refresh_token",
			refresh_token,
		}),
		headers: {
			"content-type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${new Buffer.from(
				`${clientId}:${clientSecret}`
			).toString("base64")}`,
		},
	})
		.then((response) => {
			res.send(response.data);
		})
		.catch((error) => {
			res.send(error);
		});
}
