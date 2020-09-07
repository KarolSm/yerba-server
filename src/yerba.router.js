const express = require("express");
const { v4: uuidv4 } = require("uuid");
const faker = require("faker");

const yerbaRouter = express.Router();

let list = [];

const sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

const generateList = () => {
  let i;
  for (i = 0; i < 3; i++) {
    const defeaultItem = {
      id: uuidv4(),
      name: faker.random.words(2),
      description: faker.lorem.paragraph(1),
      image: faker.image.image(),
    };
    list.push(defeaultItem);
  }
};

yerbaRouter.get("/", async (req, res, next) => {
  await sleep(1000);

  res.send(list);
  next();
});

yerbaRouter.get("/:id", (req, res, next) => {
  console.log(req.param("id"));
  const id = req.param("id");
  const found = list.find((item) => item.id === id);

  found
    ? res.send(found)
    : res.status(404).send(`Item with id: ${id} not found`);

  next();
});

yerbaRouter.post("/", (req, res, next) => {
  console.log("req", req.body);
  // id, desc, name, image
  const card = req.body;
  card.id = uuidv4(); //dodawanie do obiektu nowego property
  card.image = faker.image.image(); // dodawanie do obiektu nowego property
  console.log("jak wyglada karta", card);
  list.push(card);
  res.send(card);
});

yerbaRouter.delete("/", (req, res, next) => {
    console.log("req", req.body);
    function isBigEnough(value) {
      console.log("co to jest value.id", value.id);
      console.log("co to jest req.body.id", req.body.id);
      return req.body.id !== value.id;
    }
    const filtered = list.filter(isBigEnough)
    console.log("odfiltorwane", filtered)
    list = filtered;


    

  res.send("ok");
});

generateList();
module.exports = { yerbaRouter };
