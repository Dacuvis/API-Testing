import { swagger } from "@elysiajs/swagger";

export const swaggerPlugin = swagger({
  path: "/docs",
  documentation: {
    info: {
      title: "CivilInsight API",
      version: "1.0.0",
      description: "API for warga gweh"
    }
  }
})