// module imports from node module
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const constants = require("constants");
const controller = require("./controller");
const connectToMongoDB = require("./database");
const app = express();
const { MESSAGES } = constants;

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 6000;

// base api
app.get("/", (req, res) => {
    res.status(200).send({ messages: MESSAGES.FETCHED, success: true });
});

// fetch all rooms
app.get("/api/v1/users", async (req, res) => {
    try {
    const rooms = await controller.fetchAllRooms();
    res.status(200).send({
        message: MESSAGES.FETCHED,
        success: true,
        data: rooms,
    });
    } catch (err) {
    res.status(500).send({
        message: err.message || MESSAGES.ERROR,
        success: false,
    });
    }
});

// fetch a room
app.get("/api/v1/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await controller.fetchSingleRoomById(id);
    res.status(200).send({
      message: MESSAGES.FETCHED,
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || MESSAGES.ERROR,
      success: false,
    });
  }
});

// create a new room
app.post("/api/v1/users", async (req, res) => {
  try {
    const data = await controller.createRoom(req.body);
    res.status(201).send({
        message: MESSAGES.CREATED,
        success: true,
        data,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || MESSAGES.ERROR,
      success: false,
    });
  }
});

// edit a room
app.patch("/api/v1/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const data = await controller.editRoomById(id, body);
    res.status(200).send({
      message: MESSAGES.UPDATED,
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || MESSAGES.ERROR,
      success: false,
    });
  }
});

// delete a room
app.delete("/api/v1/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await controller.deleteRoomById(id);
    res.status(200).send({
      message: MESSAGES.DELETED,
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message || MESSAGES.ERROR,
      success: false,
    });
  }
});

app.listen(PORT, () => {
  // starting up the server
  connectToMongoDB();
  console.log(`Server started on port: ${PORT}`);
});

module.exports = app;
