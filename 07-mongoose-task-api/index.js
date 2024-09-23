const express = require("express");
const connectToDB = require("./config/db");
const taskRoutes = require("./routes/tasks");

connectToDB();

const app = express();
app.use(express.json());

app.use("/task", taskRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
