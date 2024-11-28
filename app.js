const express = require("express");
const app = express();
const port = 3000;
const dotenv = require("dotenv");
const userRoutes = require("./routers/user_routes");
const publicationRoutes = require("./routers/publication_routes");
const commentsRoutes = require("./routers/comment_routes");
const validateRoutes = require("./routers/validation_routes");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/SocialMedia")
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.error("Erreur de connexion à MongoDB :", err));

app.use("/user", userRoutes);
app.use("/publication", publicationRoutes);
// app.use("/comment", commentsRoutes);
app.use("/validate", validateRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
