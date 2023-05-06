import { Router } from "express";
import express from "express";
import messageModel from "../models/messages.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const messages = await messageModel.find().lean().exec();
  res.render("homeMessages", { messages });
});

router.post("/", async (req, res) => {
  const messageNew = req.body;
  const messageGenerated = new messageModel(messageNew);
  await messageGenerated.save();
  res.redirect("/messages");
});

export default router;
