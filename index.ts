import express, { json } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors());
app.use(express.json());
const prisma = new PrismaClient({ log: ["error", "warn", "query", "warn"] });
const PORT = 4001;

function createToken(id: number) {
  //@ts-ignore
  return jwt.sign({ id: id }, process.env.MY_SECRET);
}
// function createToken(id: number) {
//   return jwt.sign({ id: id }, process.env.MY_SECRET);
// }

async function getUserFromToken(token: string) {
  //@ts-ignore
  const decodedData = jwt.verify(token, process.env.MY_SECRET);
  const user = await prisma.user.findUnique({
    //@ts-ignore
    where: { id: decodedData.id },
  });
  return user;
}

app.get("validate", async (req, res) => {
  const token = req.headers.authorization || "";
  try {
    const user = await getUserFromToken(token);
    res.send(user);
  } catch (err) {
    res.status(400).send({ error: "Invalid Token" });
  }
});

app.get("/foods", async (req, res) => {
  const foods = await prisma.food.findMany({});
  res.send(foods);
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    include: { orders: { include: { foods: true } } },
  });
  res.send(users);
});

app.get("/restaurants", async (req, res) => {
  const restaurants = await prisma.restaurant.findMany({});
  res.send(restaurants);
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hash = bcrypt.hashSync(password, 8);
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hash,
      },
    });
    if (user) {
      res.send({ user, token: createToken(user.id) });
    } else {
      throw Error;
    }
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      //@ts-ignore
      where: { email: email },
      include: { orders: { include: { foods: true } } },
    });
    //@ts-ignore
    const passwordMatches = bcrypt.compareSync(password, user.password);
    if (user && passwordMatches) {
      res.send({ user, token: createToken(user.id) });
    } else {
      throw Error("Something went wrong!");
    }
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: "User or password invalid" });
  }
});

app.post("/order", async (req, res) => {
  const { foodId, userId, quantity } = req.body;

  try {
    const createdOrder = await prisma.order.create({
      data: {
        quantity,
        userId,
        foodId,
      },
      include: {
        users: true,
        foods: true,
      },
    });
    res.send(createdOrder);
  } catch (err) {
    // @ts-ignore
    res.status(400).send(err.message);
  }
});

app.patch("/order/:id", async (req, res) => {
  const { id, quantity } = req.body;

  try {
    const updateOrder = await prisma.order.update({
      include: {
        users: true,
        foods: true,
      },
      where: {
        id: id,
      },
      data: {
        quantity: quantity,
      },
    });
    res.send(updateOrder);
  } catch (err) {
    // @ts-ignore
    res.status(400).send(err.message);
  }
});

app.delete("/order/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    // const {email, title} = req.body
    const deleteOrder = await prisma.order.delete({ where: { id: id } });

    console.log(deleteOrder);
    if (deleteOrder) {
      res.send({ message: "Order deleted succesfully" });
    } else {
      res.send({ message: "There is no order with that id" });
    }
  } catch (err) {
    // @ts-ignore
    res.status(400).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
