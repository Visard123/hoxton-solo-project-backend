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

app.get("/validate", async (req, res) => {
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
    include: {
      orders: { include: { orderItems: { include: { food: true } } } },
    },
  });
  res.send(users);
});

app.get("/restaurants", async (req, res) => {
  const restaurants = await prisma.restaurant.findMany({});
  res.send(restaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const id = Number(req.params.id);
  const restaurants = await prisma.restaurant.findFirst({
    where: { id },
    include: { food: true },
  });
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
        orders: { create: [{}] },
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
    console.log(req);
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        orders: { include: { orderItems: { include: { food: true } } } },
      },
    });
    //@ts-ignore
    const passwordMatches = bcrypt.compareSync(password, user.password);
    if (user && passwordMatches) {
      res.send({ user, token: createToken(user.id) });
    } else {
      throw Error;
    }
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message });
  }
});

app.get("/getCurrentOrder", async (req, res) => {
  const token = req.headers.authorization || "";
  try {
    const user = await getUserFromToken(token);
    const orders = await prisma.order.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        orderItems: {
          include: {
            food: true,
          },
        },
      },
    });
    if (user && orders) {
      const lastOrder = orders.pop();
      res.send(lastOrder);
    } else {
      throw Error;
    }
  } catch (err) {
    //@ts-ignore
    res.status(400).send({ error: err.message });
  }
});

app.post("/orderItem", async (req, res) => {
  const { foodId, orderId, quantity } = req.body;

  try {
    const createdOrder = await prisma.orderItem.create({
      data: { quantity, foodId, orderId },
      include: {
        food: true,
        order: true,
      },
    });
    res.send(createdOrder);
  } catch (err) {
    // @ts-ignore
    res.status(400).send(err.message);
  }
});

app.patch("/orderItem/:id", async (req, res) => {
  const { id, quantity } = req.body;

  try {
    const updateOrder = await prisma.orderItem.update({
      include: {
        food: true,
        order: true,
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

app.patch("/increaseQuantity", async (req, res) => {
  const { itemId } = req.body;

  try {
    const updatedItem = await prisma.orderItem.update({
      include: {
        order: { include: { orderItems: { include: { food: true } } } },
      },
      where: {
        id: itemId,
      },
      data: {
        quantity: { increment: 1 },
      },
    });

    res.send(updatedItem.order);
  } catch (err) {
    // @ts-ignore
    res.status(400).send(err.message);
  }
});

app.post("/addToOrder", async (req, res) => {
  const { foodId, orderId } = req.body;

  try {
    const orderitem = await prisma.orderItem.findFirst({
      where: { foodId: foodId, orderId: orderId },
    });
    if (orderitem) {
      const updatedItem = await prisma.orderItem.update({
        include: {
          order: { include: { orderItems: { include: { food: true } } } },
        },
        where: {
          id: orderitem.id,
        },
        data: {
          quantity: { increment: 1 },
        },
      });

      res.send(updatedItem.order);
    } else {
      const createOrderItem = await prisma.orderItem.create({
        //@ts-ignore
        data: {
          order: { connect: { id: orderId } },
          food: { connect: { id: foodId } },
          quantity: 1,
        },
        include: {
          order: { include: { orderItems: { include: { food: true } } } },
        },
      });
      //@ts-ignore
      res.send(createOrderItem.order);
    }
  } catch (err) {
    // @ts-ignore
    res.status(400).send(err.message);
  }
});

app.patch("/decreaseQuantity", async (req, res) => {
  const { itemId } = req.body;

  try {
    const updatedItem = await prisma.orderItem.update({
      where: {
        id: itemId,
      },
      data: {
        quantity: { decrement: 1 },
      },
    });
    if (updatedItem.quantity === 0) {
      await prisma.orderItem.delete({ where: { id: itemId } });
    }
    const order = await prisma.order.findFirst({
      where: { id: updatedItem.orderId },
      include: {
        orderItems: { include: { food: true } },
      },
    });
    res.send(order);
  } catch (err) {
    // @ts-ignore
    res.status(400).send(err.message);
  }
});

app.delete("/orderItem/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    // const {email, title} = req.body
    const deleteOrder = await prisma.orderItem.delete({ where: { id: id } });

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
