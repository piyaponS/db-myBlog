const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const users = require("./routes/userRoute");
const articles = require("./routes/articleRoute");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", users);
app.use("/api/articles", articles);
mongoose
  .connect(
    `mongodb+srv://${user}:${password}@database.khjlk4g.mongodb.net/myBlog?retryWrites=true&w=majority`
  )
  .then((con) => {
    if (con.connection.readyState === 1) {
      console.log("Connected successfully");
    } else {
      console.log(user, password);
    }
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
