import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";

const foods: Prisma.FoodCreateInput[] = [
  {
    title: "Bacon Wrap",
    image:
      "https://images.weserv.nl/?url=lh3.googleusercontent.com/n_oYjJMZ4EwweksXqEoIfA40ygBdKsa7qQ3yImXvRqMrjtzLvcWSCMa6VuGj-q67gjBv5DxTUWWyw3VLBeREl0II6rIW-p_Ovd10FA",
    price: 470,
    restaurantId: 1,
  },
  {
    title: "Kosh i Larmishem",
    image:
      "https://images.weserv.nl/?url=prev.baboon.al/restadmin/product_images/KFC%20kosh%20i%20larmishem%20per%201%20person.png",
    price: 590,
    restaurantId: 1,
  },
  {
    title: "Fileto Boxmaster",
    image:
      "https://images.weserv.nl/?url=prev.baboon.al/restadmin/product_images/Fileto%20Boxmaster.jpg",
    price: 380,
    restaurantId: 1,
  },
  {
    title: "Kosh i Larmishem, 4 persona",
    image:
      "https://images.weserv.nl/?url=prev.baboon.al/restadmin/product_images/KFC%20kosh%20i%20larmishem%20per%204%20persona%20menu.png",
    price: 2230,
    restaurantId: 1,
  },
  {
    title: "Nugget Bucket",
    image:
      "https://images.weserv.nl/?url=lh3.googleusercontent.com/MFViBpDtNonr_HR5MK2-saVc4lS3d0K8rtV5DF-NaT8uIEEpOkKJk6_lgi0aMKN79UfCncvyWRLtA9ll0fy2UAQv8zpxsF2eXJ9wqw",
    price: 990,
    restaurantId: 2,
  },
  {
    title: "Rosti Lover",
    image:
      "https://images.weserv.nl/?url=lh3.googleusercontent.com/ckLGWwU0TiityVcuWN3Liurrm6zPKlBh2zLU6Bv_sKSbFCHz6q3AhhfMuuCxANtbuJTYIG2U3D0erJzx2V46ifK3blWJlg1qVjmQQw",
    price: 840,
    restaurantId: 2,
  },
  {
    title: "Steakhouse Meal",
    image:
      "https://images.weserv.nl/?url=prev.baboon.al/restadmin/product_images/Steakhouse-Meal-500x281.png",
    price: 880,
    restaurantId: 2,
  },
  {
    title: "Double & Trouble ",
    image:
      "https://images.weserv.nl/?url=prev.baboon.al/restadmin/product_images/OPA%20DoubleTrouble.png",
    price: 500,
    restaurantId: 3,
  },
  {
    title: "Tastefull Choice",
    image:
      "https://images.weserv.nl/?url=lh3.googleusercontent.com/wYBt1TakDulL_SqQuO_tvbkP7CNwHqDvU-mysFx8hicEkE_SNo5pUwQd9XXqwyKl229_twTczE3wG_qa0CQN4ra68J7SrgC0d0g",
    price: 1200,
    restaurantId: 3,
  },
  {
    title: "Fries with beef",
    image:
      "https://images.weserv.nl/?url=prev.baboon.al/restadmin/product_images/Opa%20Fries%20with%20Beef%20White.png",
    price: 720,
    restaurantId: 3,
  },

  {
    title: "Tave Kosi",
    image:
      "https://images.weserv.nl/?url=prev.baboon.al/restadmin/product_images/era%20Tave%CC%88%20Kosi.jpg",
    price: 600,
    restaurantId: 4,
  },
  {
    title: "Pizza Porcini",
    image:
      "https://images.weserv.nl/?url=prev.baboon.al/restadmin/product_images/era%20porcini%20salsiccia%20e%20friarielli.jpg",
    price: 800,
    restaurantId: 4,
  },
  {
    title: "Mish Vici me Spinaq",
    image:
      "https://images.weserv.nl/?url=prev.baboon.al/restadmin/product_images/era%20Mish%20Vic%CC%A7i%20me%20spinaq.jpg",
    price: 690,
    restaurantId: 4,
  },
  {
    title: "Chimichanga",
    image:
      "https://images.weserv.nl/?url=lh3.googleusercontent.com/PdCg4Wj7-THwSngdN-2KGFWNh58O0c_1zgKpmE8JJxQkB5LwKSoklmnzWe_bDMsXsTv_IUbePYXlm9841ypaM6BqLCiGBfae11o",
    price: 800,
    restaurantId: 5,
  },
  {
    title: "Enchillada",
    image:
      "https://images.weserv.nl/?url=lh3.googleusercontent.com/o8kLqbLwwtPI8GhXffTtCgi_vnQjQ0x2XvlVkUfLVUnwcoipWznajE_RJSaHXiM62v5P3KyYyW2lzu5Lk66YSL3NfNSX6iCVpYc",
    price: 900,
    restaurantId: 5,
  },
  {
    title: "Tacos Asada",
    image:
      "https://images.weserv.nl/?url=prev.baboon.al/restadmin/product_images/Tacos%20Asada.jpeg",
    price: 1000,
    restaurantId: 5,
  },
  {
    title: "Shrimp Tempura ",
    image:
      "https://images.weserv.nl/?url=prev.baboon.al/restadmin/product_images/lift_shrimp%20tempura.jpg",
    price: 900,
    restaurantId: 6,
  },
  {
    title: "Caesar Salad",
    image:
      "https://images.weserv.nl/?url=prev.baboon.al/restadmin/product_images/lift_caesar%20salad%20(1).jpg",
    price: 750,
    restaurantId: 6,
  },
  {
    title: "Beef Carpaccio ",
    image:
      "https://images.weserv.nl/?url=prev.baboon.al/restadmin/product_images/lift_beef%20carpaccio.jpg",
    price: 1900,
    restaurantId: 6,
  },
  {
    title: "Ebi Uramaki ",
    image:
      "https://images.weserv.nl/?url=prev.baboon.al/restadmin/product_images/Ebi%20Avokado%20Maki_0%20nama%20sushi.png",
    price: 900,
    restaurantId: 7,
  },
  {
    title: "Vegetarian Uramaki",
    image:
      "https://images.weserv.nl/?url=prev.baboon.al/restadmin/product_images/vegetarian%20maki%20nama%20sushi.jpg",
    price: 600,
    restaurantId: 7,
  },
  {
    title: "Karai Ebi ",
    image:
      "https://images.weserv.nl/?url=prev.baboon.al/restadmin/product_images/karai%20ebi%20nama%20sushi.jpg",
    price: 500,
    restaurantId: 7,
  },
  {
    title: "Berxolle Qingji ",
    image:
      "https://images.weserv.nl/?url=prev.baboon.al/restadmin/product_images/berxolle%20qingji.jpg",
    price: 1200,
    restaurantId: 8,
  },
  {
    title: "Radiko e Finok Zgare ",
    image:
      "https://images.weserv.nl/?url=prev.baboon.al/restadmin/product_images/radikio%20e%20finok%20zgare.jpg",
    price: 700,
    restaurantId: 8,
  },
  {
    title: "Sallata e Dites ",
    image:
      "https://images.weserv.nl/?url=prev.baboon.al/restadmin/product_images/SALLATE%20(30).jpg",
    price: 600,
    restaurantId: 8,
  },
  {
    title: "Perfect Combo ",
    image:
      "https://images.weserv.nl/?url=prev.baboon.al/restadmin/product_images/Milky%20perfect%20combo%20doesnt%20exi-.png",
    price: 470,
    restaurantId: 9,
  },
  {
    title: "Angel ",
    image:
      "https://images.weserv.nl/?url=prev.baboon.al/restadmin/product_images/Milky%20angel.png",
    price: 630,
    restaurantId: 9,
  },
  {
    title: "Take me Home Tonight ",
    image:
      "https://images.weserv.nl/?url=prev.baboon.al/restadmin/product_images/take%20me%20home%202night_MILKY.jpeg",
    price: 480,
    restaurantId: 9,
  },
];

const restaurants: Prisma.RestaurantCreateInput[] = [
  {
    name: "KFC",
    image: "https://kfc.al/sites/default/files/Zinger%20Boxmaster%20Menu.jpg",
  },
  {
    name: "Burger King",
    image:
      "https://pavilion.cxcms.ascentis.com.sg/mallsmobile/media/mediafields/Outlet/4d2t30x9j0wrxva7v5w26mmecs/1067c0f23a03d0ac2294b9e397a2492c.jpg",
  },
  {
    name: "OPA",
    image:
      "https://lh3.googleusercontent.com/p/AF1QipNHLu_BY0-cLrheUTHVzts10MFp2KWDbcXuamoM=s1600-w400",
  },
  {
    name: "Pizzeri Era",
    image:
      "https://dhurata.com/images/retailers/article/tiranepizzaera/kapricioza.jpg",
  },
  {
    name: "Serendipity",
    image: "https://pbs.twimg.com/media/Dxl8XrrWwAAKo50.jpg",
  },
  {
    name: "Lift",
    image:
      "https://rhg-services-images-production.s3.eu-central-1.amazonaws.com/596cc39e-3671-4f08-bb73-3a3e58766d07_d02d31bdd61c666253f52a7cee8f2d8b_a36998ac-5d2e-494e-9c7e-8c7409b5b514_NY%20STRIP.jpg",
  },

  {
    name: "Nama Sushi",
    image: "https://cdnimpuls.com/o.anabel.al/media3/-640-0-5abe350c3cb42.jpg",
  },
  {
    name: "Vila Ferdinand",
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/1c/d4/6a/b2/il-gusto.jpg",
  },
  {
    name: "Milky",
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/16/9d/06/8b/milky-tirana-rr-pjeter.jpg",
  },
];

const users: Prisma.UserCreateInput[] = [
  {
    name: "John",
    email: "John@mail",
    password: bcrypt.hashSync("John"),
    orders: {
      create: [{ foods: { connect: { title: "Bacon Wrap" } }, quantity: 1 }],
    },
  },
  {
    name: "Lionel",
    email: "Lionel@mail",
    password: bcrypt.hashSync("Lionel"),
  },
  {
    name: "Andres",
    email: "Andres@mail",
    password: bcrypt.hashSync("Andres"),
  },
  {
    name: "Ylber",
    email: "Ylber@mail",
    password: bcrypt.hashSync("Ylber"),
  },
  {
    name: "Shpetim",
    email: "Shpetim@mail",
    password: bcrypt.hashSync("Shpetim"),
  },
];
async function createStuff() {
  for (const restaurant of restaurants) {
    await prisma.restaurant.create({ data: restaurant });
  }
  for (const food of foods) {
    await prisma.food.create({ data: food });
  }

  for (const user of users) {
    await prisma.user.create({ data: user });
  }
}
createStuff();
