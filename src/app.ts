import fastify from "fastify"

import { orgRoutes } from "./modules/org/org.routes";
import { petRoutes } from "./modules/pet/pet.routes";

const app = fastify()

app.register(orgRoutes);
app.register(petRoutes);

export { app }