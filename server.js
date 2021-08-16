import express from "express";
import mongoose from "mongoose";
import Cards from "./models/Cardsdb.js";
import Cors from "cors";
//App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
  "mongodb+srv://dbUser:WDM9rLAuOuxFSY88@cluster0.5nw2h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const connection_url = "mongodb+srv://<username>:<password>@cluster0.5nw2h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//Middlewares
app.use(express.json());
app.use(Cors());
//DB config
mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

//API Endpoints
app.get("/", (req, res) => res.status(200).send("test"));

app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});
//Listener
app.listen(port, () => console.log(`You're Connected on localhost:${port}`));
