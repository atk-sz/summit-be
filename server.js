const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const fs = require("fs");
const cors = require("cors");
const seed = require("./seed");
require("dotenv").config();

// app
const app = express();

// port
const port = process.env.PORT || 8000;

// db
// process.env.ATLAS_URI
// 'mongodb+srv://admin:admin@cluster0.keu4y.mongodb.net/SummitRef1?retryWrites=true&w=majority'
mongoose
  .connect(process.env.ATLAS_URI||'mongodb://localhost:27017/Summit', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    seed()
    console.log("Connected to MongoDB")
})
  .catch((err) => console.log(`DB connection error - ${err}`));

// middlewares
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// routes middleware
fs.readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);

app.listen(port, () => console.log(`Running server on PORT ${port}`));
