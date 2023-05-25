import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import jwt from "jsonwebtoken";
import { upload } from "./server";

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
      return console.log({error: "User not found"});
    }

    const match = await (password == user.password);

    if (!match) {
      return console.log({error: "Invalid credentials"});
    }

    if (match || user) {
      let token = jwt.sign({userId: user.id}, "mysecret");

      return res.send({
        token: token,
        email: user.email,
        name: user.firstName,
        id: user.id,
      });
    }
  });

  app.post("/books", async (req) => {
    const createBook = z.object({
      title: z.string(),
      type: z.string(),
      price: z.number(),
      author: z.string(),
      description: z.string(),
    });

    const {title, author, description, type, price} = createBook.parse(req.body);

    await prisma.book.create({
      data: {
        title,
        author,
        description,
        price,
        type,
      },
    });
  });

  app.get("/books/all", async (_req, res) => {
    try {
      const books = await prisma.book.findMany();
      return res.send(books);
    } catch (error) {
      return res.status(500).send({error: "Error searching books"});
    }
  });

  app.delete("/book/:id/delete", async (req: any, res) => {
    console.log(req.params)

    try {
      const deletedBook = await prisma.user.delete({
        where: {
          id: req.params.id,
        },
      });

      res.send(deletedBook);
    } catch (error) {
      res.status(500).send({error: "Error delete book"});
    }
  });

  app.get("/books/:type", async (req: any, res) => {
    const {type} = req.params;

    const bookTypes: any = {
      "sci-fi": "Sci-fi",
      "fantasy": "Fantasy",
      "romance": "Romance",
      "thriller": "Thriller",
    }

    try {
      const books = await prisma.book.findMany({
        where: {
          type: bookTypes[type],
        },
      });

      if (!books) {
        return console.log({error: "Books not found"});
      }

      return res.send(books);
    } catch (error) {
      return res.status(500).send({error: "Error searching books"});
    }
  });

  app.put("/book/:id/edit", async (req: any, res) => {
    try {
      const updatedPerson = await prisma.user.update({
        where: {
          id: req.id,
        },
        data: {
          firstName: req.firstName,
          lastName: req.lastName,
          email: req.email,
          password: req.password,
          role: req.role,
          phone: req.phone,
          address: req.address,
        },
      });

      res.send(updatedPerson);
    } catch (error) {
      res.status(500).send({error: "Error edit book"});
    }
  });

  app.get("/book/:id/show", async (req: any, res) => {
    const {id} = req.params;

    try {
      const book = await prisma.book.findUnique({
        where: {
          id: id,
        },
      });

      if (!book) {
        return console.log({error: "Book not found"});
      }

      return res.send(book);
    } catch (error) {
      return res.status(500).send({error: "Error searching book"});
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

      const newPerson = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password,
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

  app.put("/book/:id/update", async (req: any, res) => {
    const {id} = req.params;
    const {title, author, description, price, type} = req.body;

    try {
      const updatedBook = await prisma.book.update({
        where: {
          id: id,
        },
        data: {
          title: title,
          author: author,
          description: description,
          price: price,
          type: type,
        },
      });
      console.log(updatedBook, "updated");
    } catch (error) {
      res.status(500).send({error: "Error edit book"});
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

  app.post("/cart/add", async (req, response) => {
    const createCart = z.object({
      personId: z.string(),
      bookId: z.string(),
      quantity: z.number(),
    });

    const {personId, bookId, quantity} = createCart.parse(req.body);

    const bookExists = await prisma.cart.findFirst({
      where: {
        personId: personId,
        bookId: bookId,
      }
    })

    if (bookExists) {
      try {
        const updatedCart = await prisma.cart.update({
          where: {
            id: bookExists.id,
          },
          data: {
            quantity: quantity + bookExists.quantity,
          },
        });

        return response.send(updatedCart);
      } catch (error) {
        return response.status(500).send({error: "Error updating cart"});
      }
    }

    try {
      const newCart = await prisma.cart.create({
        data: {
          personId,
          bookId,
          quantity,
        },
      });

      return response.send(newCart);
    } catch (error) {
      return response.status(500).send({error: "Error adding to cart"});
    }
  });

  app.get("/cart/:id/show", async (req: any, response) => {
    const {id} = req.params;

    try {
      const cart = await prisma.cart.findUnique({
        where: {
          id,
        },
      });

      if (!cart) {
        return response.status(404).send({error: "Cart not found"});
      }

      return response.send(cart);
    } catch (error) {
      return response.status(500).send({error: "Error retrieving cart"});
    }
  });

  app.delete("/cart/:id/delete", async (req: any, response) => {
    const {id} = req.params;

    try {
      const deletedCart = await prisma.cart.delete({
        where: {
          id,
        },
      });

      return response.send(deletedCart);
    } catch (error) {
      return response.status(500).send({error: "Error deleting cart"});
    }
  });

  app.put("/cart/update", async (req: any, response) => {
    const {personId, bookId, quantity} = req.body;

    const cartBook = await prisma.cart.findFirst({
      where: {
        personId: personId,
        bookId: bookId,
      }
    })

    if (!cartBook) {
      return response.status(404).send({error: "Cart not found"});
    }

    try {
      const updatedCart = await prisma.cart.update({
        where: {
          id: cartBook.id,
        },
        data: {
          quantity: quantity,
        }
      });

      return response.send(updatedCart);
    } catch (error) {
      return response.status(500).send({error: "Error updating cart"});
    }
  });

  app.delete("/cart/remove", async (req: any, response) => {
    const {personId, bookId} = req.body;

    const cartBook = await prisma.cart.findFirst({
      where: {
        personId: personId,
        bookId: bookId,
      }
    });

    if (!cartBook) {
      return response.status(404).send({error: "Cart not found"});
    }

    try {
      const deletedCart = await prisma.cart.delete({
        where: {
          id: cartBook.id,
        },
      });

      return response.send(deletedCart);
    } catch (error) {
      return response.status(500).send({error: "Error deleting cart"});
    }
  });

  app.delete("/cart/clear", async (req: any, response) => {
    const {personId} = req.body;

    try {
      const deletedCart = await prisma.cart.deleteMany({
        where: {
          personId,
        },
      });

      return response.send(deletedCart);
    } catch (error) {
      return response.status(500).send({error: "Error deleting cart"});
    }
  });

  app.get("/cart/person/:personId", async (req: any, response) => {
    const {personId} = req.params;

    try {
      const userCart = await prisma.cart.findMany({
        where: {
          personId,
        },
      });

      return response.send(userCart);
    } catch (error) {
      return response.status(500).send({error: "Error retrieving user cart"});
    }
  });

  app.post("/order/create", async (req: any, response) => {
    const { orderData } = req.body;

    try {
      const createdOrder = await prisma.order.create({
        data: {
          personId: orderData.personId,
          completed: orderData.completed,
          totalPrice: orderData.totalPrice,
        }
      });

      return response.send(createdOrder);
    } catch (error) {
      return response.status(500).send({ error: "Error creating order" });
    }
  });

  app.get("/order/:orderId/show", async (req: any, response) => {
    const { orderId } = req.params;

    try {
      const order = await prisma.order.findUnique({
        where: {
          id: orderId,
        },
      });

      if (!order) {
        return response.status(404).send({ error: "Order not found" });
      }

      return response.send(order);
    } catch (error) {
      return response.status(500).send({ error: "Error retrieving order" });
    }
  });

  app.get("/order/person/:personId", async (req: any, response) => {
    const { personId } = req.params;

    try {
      const personOrders = await prisma.order.findMany({
        where: {
          personId: personId,
        },
      });

      return response.send(personOrders);
    } catch (error) {
      return response.status(500).send({ error: "Error retrieving user orders" });
    }
  });

  app.put("/order/:orderId/update", async (req: any, response) => {
    const { orderId } = req.params;
    const updatedOrderData = req.body;

    try {
      const updatedOrder = await prisma.order.update({
        where: {
          id: orderId,
        },
        data: updatedOrderData,
      });

      return response.send(updatedOrder);
    } catch (error) {
      return response.status(500).send({ error: "Error updating order" });
    }
  });

  app.put("/order/:orderId/complete", async (req: any, response) => {
    const { orderId } = req.params;

    try {
      const completedOrder = await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          completed: true,
        },
      });

      return response.send(completedOrder);
    } catch (error) {
      return response.status(500).send({ error: "Error completing order" });
    }
  });

  app.get("/order/all", async (req: any, response) => {
    try {
      const orders = await prisma.order.findMany();

      return response.send(orders);
    } catch (error) {
      return response.status(500).send({error: "Error retrieving orders"});
    }
  });

  app.post("/orderItem/add", async (req: any, response) => {
    const { orderId, bookId, quantity, price } = req.body;

    try {
      const createdOrderItem = await prisma.orderItem.create({
        data: {
          orderId,
          bookId,
          quantity,
          price,
        },
      });

      return response.send(createdOrderItem);
    } catch (error) {
      return response.status(500).send({ error: "Error creating order item" });
    }
  });

  app.get("/orderItem/:orderItemId/show", async (req: any, response) => {
    const { orderItemId } = req.params;

    try {
      const orderItem = await prisma.orderItem.findUnique({
        where: {
          id: orderItemId,
        },
      });

      if (!orderItem) {
        return response.status(404).send({ error: "Order item not found" });
      }

      return response.send(orderItem);
    } catch (error) {
      return response.status(500).send({ error: "Error retrieving order item" });
    }
  });

  app.get("/orderItem/order/:orderId", async (req: any, response) => {
    const { orderId } = req.params;

    try {
      const orderItems = await prisma.orderItem.findMany({
        where: {
          orderId,
        },
      });

      return response.send(orderItems);
    } catch (error) {
      return response.status(500).send({ error: "Error retrieving order items" });
    }
  });

  app.put("/orderItem/:orderItemId/update", async (req: any, response) => {
    const { orderItemId } = req.params;
    const updatedOrderItemData = req.body;

    try {
      const updatedOrderItem = await prisma.orderItem.update({
        where: {
          id: orderItemId,
        },
        data: updatedOrderItemData,
      });

      return response.send(updatedOrderItem);
    } catch (error) {
      return response.status(500).send({ error: "Error updating order item" });
    }
  });

  app.delete("/orderItem/:orderItemId/remove", async (req: any, response) => {
    const { orderItemId } = req.params;

    try {
      const deletedOrderItem = await prisma.orderItem.delete({
        where: {
          id: orderItemId,
        },
      });

      return response.send(deletedOrderItem);
    } catch (error) {
      return response.status(500).send({ error: "Error deleting order item" });
    }
  });
}
