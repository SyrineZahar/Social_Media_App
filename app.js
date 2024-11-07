const express = require("express");
const app = express();
const port = 3000;

const userRoutes = require("./routers/user_routes");
const publicationRoutes = require("./routers/publication_routes");
const commentsRoutes = require("./routers/comment_routes");

app.use("/user", userRoutes);
app.use("/publication", publicationRoutes);
app.use("/comment", commentsRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
