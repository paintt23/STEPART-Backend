import express from "express";
import { PrismaClient } from "@prisma/client";

import cors from "cors";

const app = express();
const prisma = new PrismaClient();
app.use(cors());
const PORT = 5000;

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Admin Api
//findMany
app.get("/readalladmin", async (req, res) => {
  //prisma findMany
  const alladmin = await prisma.admin.findMany({});
  return res.json(alladmin);
});
//findUnique
app.get("/readadminwithid/:id", async (req, res) => {
  const id = req.params.id;
  //   return res.json(id);
  //prisma findUnique
  const myadmin = await prisma.admin.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return res.json(myadmin);
});

app.get("/readadminwithemail/:email", async (req, res) => {
  const email = req.params.email;
  //   return res.json(id);
  //prisma findUnique
  const myadmin = await prisma.admin.findUnique({
    where: {
      email: email,
    },
  });

  return res.json(myadmin);
});
//create
app.post("/addadmin", async (req, res) => {
  //create
  //insert into admin ()
  const newAdmin = await prisma.admin.create({ data: req.body });
  return res.json(newAdmin);
});
//update
app.put("/updateadmin", async (req, res) => {
  //update
  const { id, firstName, lastName } = req.body;

  const newdata = await prisma.admin.update({
    where: { id: parseInt(id) },
    data: { firstName, lastName },
  });
  return res.json(newdata);
});

//delete
app.delete("/deleteadmin/:id", async (req, res) => {
  const id = req.params.id;
  //prisma findUnique
  const mydate = await prisma.admin.delete({
    where: {
      id: parseInt(id),
    },
  });
  return res.json(mydate);
});

//////////////
app.post("/addcourse", async (req, res) => {
  const newAdmin = await prisma.course.create({ data: req.body });
  return res.json(newAdmin);
});

app.listen(PORT, () => console.log("welcome..."));
