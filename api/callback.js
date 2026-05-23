import axios from "axios";

export default async function handler(req, res) {
  try {
    const code = req.query.code;

    if (!code) {
      return res.status(400).send("No code provided");
    }

    const data = new URLSearchParams();
    data.append("client_id", process.env.CLIENT_ID);
    data.append("client_secret", process.env.CLIENT_SECRET);
    data.append("grant_type", "authorization_code");
    data.append("code", code);
    data.append("redirect_uri", process.env.REDIRECT_URI);

    const tokenRes = await axios.post(
      "https://discord.com/api/oauth2/token",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenRes.data.access_token;

    const userRes = await axios.get(
      "https://discord.com/api/users/@me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const user = userRes.data;

    return res.redirect(`/api/verify?user=${user.id}`);

  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);

    return res.status(500).send("OAuth failed. Check logs.");
  }
}
