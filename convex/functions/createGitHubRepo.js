import { mutation } from "../_generated/server";
import axios from "axios";

// Mutación para crear un repositorio en GitHub
export const createGitHubRepo = mutation(async ({ db }, { userId, repoName }) => {
  // Obtén el token de GitHub del usuario
  const tokenData = await db.query("github_tokens")
    .filter(q => q.eq(q.field("userId"), userId))
    .first();

  if (!tokenData?.token) {
    throw new Error("GitHub token not found for user");
  }

  const token = tokenData.token;

  try {
    // Llama a la API de GitHub para crear el repositorio
    const response = await axios.post(
      "https://api.github.com/user/repos",
      { name: repoName, private: false },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data; // Devuelve los datos del repositorio creado
  } catch (error) {
    console.error("Error creating GitHub repository:", error.response?.data);
    throw new Error("Failed to create GitHub repository");
  }
});
