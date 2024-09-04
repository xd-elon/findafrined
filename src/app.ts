import fastify from "fastify"

import { userRoutes } from "./modules/user/user.routes";
import { mealRoutes } from "./modules/meal/meal.routes";

const app = fastify()

app.register(userRoutes);
app.register(mealRoutes);

export { app }