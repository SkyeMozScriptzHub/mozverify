export default function handler(req, res) {

  const CLIENT_ID = process.env.CLIENT_ID;
  const REDIRECT_URI = process.env.REDIRECT_URI;

  const url =
`https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify%20guilds.join`;

  res.redirect(url);
}
