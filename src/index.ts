import cors from "@elysia/cors"
import { Elysia } from "elysia"
import { db } from "./config/database"
import "./database/init"
import newsRoutes from "./Module/Routes/news.routes"
import { logger } from "@bogeychan/elysia-logger"
import { rateLimit } from "elysia-rate-limit"
import { swaggerPlugin } from "./plugins/swagger"
import { userRoutes } from "./Module/Routes/user.routes"
import { aiRoute } from "./Module/Routes/ai.routes"
import { healthRoutes } from "./Module/Routes/health.routes"

const app = new Elysia()
  .use(cors())
  .use(rateLimit({
    duration: 60000,
    max: 100
  }))
  .use(logger())
  .use(swaggerPlugin)
  .use(aiRoute)
  .use(userRoutes)
  .use(newsRoutes)
  .use(healthRoutes)
  .listen(4000, () => {
    console.log("Server is running on port 4000")
  })
  