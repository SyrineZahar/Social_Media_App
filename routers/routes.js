const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Not implemented yet"));

app.get("/user", (req, res) => res.send("Not implemented yet"));
app.post("/user", (req, res) => res.send("Not implemented yet"));
app.get("/user/:id", (req, res) => res.send("Not implemented yet"));
app.put("/user/:id", (req, res) => res.send("Not implemented yet"));
app.delete("/user/:id", (req, res) => res.send("Not implemented yet"));

app.get("/comments", (req, res) => res.send("Not implemented yet"));
app.post("/comments", (req, res) => res.send("Not implemented yet"));
app.get("/comments/:id", (req, res) => res.send("Not implemented yet"));
app.put("/comments/:id", (req, res) => res.send("Not implemented yet"));
app.delete("/comments/:id", (req, res) => res.send("Not implemented yet"));

app.get("/publication", (req, res) => res.send("Not implemented yet"));
app.post("/publication", (req, res) => res.send("Not implemented yet"));
app.get("/publication/:id", (req, res) => res.send("Not implemented yet"));
app.put("/publication/:id", (req, res) => res.send("Not implemented yet"));
app.delete("/publication/:id", (req, res) => res.send("Not implemented yet"));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
