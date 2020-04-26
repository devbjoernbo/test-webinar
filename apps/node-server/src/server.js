const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const streamsDB = {
  clients: [
    {
      UUID: "hello1",
      url: `http://localhost/live/hello1`,
      clientName: "Test 1"
    },
    {
      UUID: "hello2",
      url: `http://localhost/live/hello2`,
      clientName: "Test 2"
    },
    {
      UUID: "hello3",
      url: `http://localhost/live/hello3`,
      clientName: "Test 3"
    }
  ]
};

// initialize app;
const app = express();
app.use(cors({ credentials: true, origin: "http://dev.ui.localhost" }));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  res.send("Test api");
});

app.post("/getclients", async (req, res) => {
  res.send(streamsDB.clients);
});

app.post("/streams/show", async (req, res) => {
  const { streamID } = req.body;

  const foundStream = streamsDB[streamID];

  res.send(JSON.stringify(foundStream));
});

app.post("/streams/create", async (req, res) => {
  const { streamID, title, description } = req.body;

  streamsDB[streamID] = { title, description };

  res.send(streamID);
});

app.post("/streams/delete", async (req, res) => {
  const { streamID } = req.body;

  delete streamsDB[streamID];

  res.send(streamID);
});

app.listen(3000, function() {
  console.log(`Running API-server at localhost:3000`);
});
