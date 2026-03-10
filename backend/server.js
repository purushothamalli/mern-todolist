require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    }),
);
const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.DB_URI).then((conn) => {
    console.log("Connected to DB: ", conn.connection.name);
    app.listen(process.env.PORT || 4000, () => {
        console.log("Server running on Port " + process.env.PORT);
    });
});

app.use("/api/user", require("./routes/user"));
app.use("/api/todolist", require("./routes/todos"));
app.use(errorHandler);
