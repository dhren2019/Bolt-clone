import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users:defineTable({
        name:v.string(),
        email:v.string(),
        picture:v.string(),
        uid:v.string(),
        token:v.optional(v.number())
    }),
    workspace:defineTable({
        messages:v.any(),//JSON OBJECT
        fileData:v.optional(v.any()),
        user:v.id('users')
    }),
    github_tokens: defineTable({
        userId: v.string(), // ID del usuario (validador correcto)
        token: v.string(),  // Token de GitHub (validador correcto)
      }),
})

