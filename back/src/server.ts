import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";
import path from "path";

const app = Fastify();

app.register(require("@fastify/formbody"));
app.register(require("@fastify/multipart"), {
    limits: {
        fileSize: 30000000,
    }
});

app.register(require("@fastify/static"), {
    root: path.join(__dirname, "images"),
    prefix: "/images/",
});

app.register(appRoutes);
app.register(cors);

app
    .listen({
        port: 3333,
    })
    .then(() => {
        console.log("HTTP Server running!");
    });