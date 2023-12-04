import {FastifyInstance} from "fastify";
import {z} from "zod";
import {prisma} from "./lib/prisma";
import jwt from "jsonwebtoken";
import * as fs from "fs";
import {v4 as uuid} from "uuid";
import mime from "mime-types";

const pump = util.promisify(pipeline);
import {pipeline} from "stream";
import util from "util";
import fsPromises from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";

interface LoginData {
    email: string;
    password: string;
}

export async function appRoutes(app: FastifyInstance) {
    app.post("/login", async (req, res) => {
        const {email, password} = req.body as LoginData;

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return res.status(401).send({error: "User not found"});
        }

        if (user.role === 'admin') {
            if (password !== user.password) {
                return res.status(401).send({error: "Invalid credentials"});
            }
        } else {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).send({error: "Invalid credentials"});
            }
        }

        const token = jwt.sign({userId: user.id}, "mysecret");

        return res.send({
            token,
            email: user.email,
            name: user.firstName,
            id: user.id,
        });
    });

    app.post("/recipes", async (req, res) => {
        const data = await (req as any).file() as any;

        const body = {
            instructions: data.fields.instructions.value,
            description: data.fields.description.value,
            title: data.fields.title.value,
            type: data.fields.type.value,
            userId: data.fields.userId.value
        };

        const filename = uuid() + `.` + mime.extension(data.mimetype);
        await pump(data.file, fs.createWriteStream(`./images/${filename}`));

        const createRecipe = z.object({
            userId: z.string(),
            instructions: z.string(),
            description: z.string(),
            title: z.string(),
            type: z.string(),
        });

        console.log('data2')

        const {userId, instructions, description, title, type} =
            createRecipe.parse(body);

        console.log(userId, 'data3')

        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        console.log('user', user, userId)

        if (user) {
            console.log(user);
            try {
                return await prisma.recipe.create({
                    data: {
                        instructions,
                        description,
                        title,
                        type,
                        image: filename,
                        user: {
                            connect: {
                                id: userId,
                            },
                        },
                    },
                });
            } catch (error) {
                return res.status(500).send({error: "Error while creating recipe"});
            }
        }
    });

    app.get("/file/:image", async (req: any, res) => {
            const {image} = req.params;
            const file = await fsPromises.readFile(path.join("images", image));
            return res.type("image/jpeg").send(file);
        }
    );

    app.get("/recipes/:type", async (req: any, res) => {
        const {type} = req.params;

        const cuisineTypes: any = {
            "italian": "Italian",
            "chinese": "Chinese",
            "mexican": "Mexican",
            "indian": "Indian",
            "japanese": "Japanese",
            "french": "French",
            "thai": "Thai",
            "greek": "Greek",
            "spanish": "Spanish",
            "brazilian": "Brazilian",
            "middleEastern": "Middle Eastern",
            "vietnamese": "Vietnamese",
            "korean": "Korean",
            "african": "African",
            "mediterranean": "Mediterranean",
        };

        try {
            const recipes = await prisma.recipe.findMany({
                where: {
                    type: cuisineTypes[type],
                },
            });

            if (!recipes) {
                return console.log({error: "Recipes not found"});
            }

            return res.send(recipes);
        } catch (error) {
            return res.status(500).send({error: "Error searching recipes"});
        }
    });

    app.get("/recipe/:id/show", async (req: any, res) => {
        const {id} = req.params;

        try {
            const recipe = await prisma.recipe.findUnique({
                where: {
                    id: id,
                },
            });

            if (!recipe) {
                return console.log({error: "Recipe not found"});
            }

            return res.send(recipe);
        } catch (error) {
            return res.status(500).send({error: "Error searching recipe"});
        }
    });

    app.post("/person/add", async (req, response) => {
        const createPerson = z.object({
            firstName: z.string(),
            lastName: z.string(),
            email: z.string(),
            password: z.string(),
            role: z.string(),
            phone: z.string(),
            address: z.string(),
        });

        const {
            firstName,
            lastName,
            email,
            password,
            role,
            phone,
            address,
        } = createPerson.parse(req.body);

        try {
            const accountAlreadyExists = await prisma.user.findFirst({
                where: {email},
            });

            if (accountAlreadyExists) {
                return response.status(409).send({error: "E-mail already exists"});
            }

            // pw hashing
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newPerson = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                    role,
                    phone,
                    address,
                },
            });

            return response.send(newPerson);
        } catch (error) {
            return response
                .status(500)
                .send({error: "Error while creating account"});
        }
    });

    app.post("/ingredient/add", async (req, response) => {
        const createIngredient = z.object({
            name: z.string(),
            qtd: z.string(),
            tags: z.string(),
        });

        console.log('dsajdjas')
        console.log('dadsa', req)

        const {
            name,
            qtd,
            tags
        } = createIngredient.parse(req.body);

        console.log('data2')

        try {
            const newIngredient = await prisma.ingredient.create({
                data: {
                    name,
                    qtd,
                    tags
                },
            });

            return response.send(newIngredient);
        } catch (error) {
            return response
                .status(500)
                .send({error: "Error while creating ingredient"});
        }
    });

    app.get("/person/all", async (req, res) => {
        try {
            const people = await prisma.user.findMany();
            return res.send(people);
        } catch (error) {
            return res.status(500).send({error: "Error searching people"});
        }
    });

    app.delete("/persons/:id/delete", async (req: any, res) => {
        try {
            const deletedPerson = await prisma.user.delete({
                where: {
                    id: req.params.id,
                },
            });

            res.send(deletedPerson);
        } catch (error) {
            res.status(500).send({error: "Error delete person"});
        }
    });

    app.put("/person/:id/update", async (req: any, res) => {
        const {id} = req.params;
        const {firstName, lastName, email, password, phone, role, address} =
            req.body;

        try {
            const updatedPerson = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    phone: phone,
                    role: role,
                    address: address,
                },
            });
            console.log(updatedPerson, "updated");
        } catch (error) {
            res.status(500).send({error: "Error edit person"});
        }
    });

    app.get("/person/:id/show", async (req: any, res) => {
        const {id} = req.params;

        try {
            const person = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });

            if (!person) {
                return console.log({error: "Person not found"});
            }

            return res.send(person);
        } catch (error) {
            return res.status(500).send({error: "Error searching person"});
        }
    });

    app.get("/ingredients/all", async (req, res) => {
        try {
            const ingredients = await prisma.ingredient.findMany();
            console.log(ingredients);
            return res.send(ingredients);
        } catch (error) {
            return res.status(500).send({error: "Error searching ingredients"});
        }
    });

    app.get("/recipes/all", async (req, res) => {
        try {
            const recipes = await prisma.recipe.findMany();
            return res.send(recipes);
        } catch (error) {
            return res.status(500).send({error: "Error searching ingredients"});
        }
    });


}
