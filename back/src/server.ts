import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";
const multer = require("fastify-multer");

// Define the multer storage configuration
const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, "./uploads/"); // Set the destination folder
    },
    filename: (req: any, file: any, cb: any) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const extension = file.originalname.split(".").pop(); // Get the file extension
        cb(null, `${uniqueSuffix}.${extension}`); // Set the filename for the saved cover image
    },
});

// Create the multer instance
export const upload = multer({ storage });

const app = Fastify();

app.register(multer.contentParser)
app.register(require("@fastify/formbody"));

app.register(appRoutes);
app.register(cors);

app.listen({port: 3333,}).then(() => {
    console.log("HTTP Server running!");
});
