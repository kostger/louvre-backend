import express from "express";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

// Get all events
app.get("/events", async (req, res) => {
  const events = await prisma.event.findMany();
  res.json(events);
});

// Book a ticket
app.post("/book-ticket", async (req, res) => {
  const { eventId, userName, email } = req.body;
  try {
    const ticket = await prisma.ticket.create({
      data: {
        eventId,
        userName,
        email,
      },
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ error: "Could not book ticket" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
