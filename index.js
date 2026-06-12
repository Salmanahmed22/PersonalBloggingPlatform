require('dotenv').config();

const express = require('express');
const connectDB = require("./config/db");
const authRouter = require("./routers/authRouter");
const postRouter = require("./routers/postRouter");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/posts", postRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(errorHandler);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

startServer();