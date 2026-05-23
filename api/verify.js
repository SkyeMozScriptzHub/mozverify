import axios from "axios";

export default async function handler(req, res) {

  const userId = req.query.user;

  const guildId = process.env.GUILD_ID;
  const roleId = process.env.ROLE_ID;

  await axios.put(
    `https://discord.com/api/guilds/${guildId}/members/${userId}/roles/${roleId}`,
    {},
    {
      headers: {
        Authorization: `Bot ${process.env.BOT_TOKEN}`
      }
    }
  );

  res.send(`
    <html>
      <body style="background:#0f172a;color:white;text-align:center;padding-top:100px;font-family:sans-serif">
        <h1>✅ Verified!</h1>
        <p>You now have access.</p>
      </body>
    </html>
  `);
}
