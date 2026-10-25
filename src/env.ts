import { defineEnvVars } from "@sveltejs/kit/env"

export const variables = defineEnvVars({
  DATABASE_URL: { description: "The database connection string." },
  ADMIN_PASSWORD: {
    description: "Password for the /admin dashboard used to generate invitations.",
    schema: (value) => {
      if (!value || value.length < 8)
        throw new Error("ADMIN_PASSWORD must be at least 8 characters")
      return value
    },
  },
})
