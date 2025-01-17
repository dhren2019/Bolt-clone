import axios from "axios";

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  try {
    // Intercambiar el código por un token de acceso
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const { access_token } = response.data;

    if (access_token) {
      // Redirigir al workspace con el token (opcionalmente puedes guardarlo en la base de datos)
      return res.redirect(`/workspace?token=${access_token}`);
    } else {
      return res.status(400).json({ error: "No access token received" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error authenticating with GitHub" });
  }
}
