import { mutation } from "../_generated/server";

// Mutación para guardar el token de GitHub
export const storeGitHubToken = mutation(async ({ db }, { userId, token }) => {
  // Verifica si ya existe un token para este usuario
  const existingToken = await db.query("github_tokens")
    .filter(q => q.eq(q.field("userId"), userId))
    .first();

  if (existingToken) {
    // Actualiza el token existente
    await db.patch(existingToken._id, { token });
  } else {
    // Inserta un nuevo token
    await db.insert("github_tokens", { userId, token });
  }
});
