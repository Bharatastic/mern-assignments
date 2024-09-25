const express = require("express");
const connectToDB = require("./config/db");
const taskRoutes = require("./routes/tasks");
const authRoutes = require("./routes/auth");

connectToDB();

const app = express();
app.use(express.json());

// Routes for task management
app.use("/task", taskRoutes);

// Routes for authentication
app.use("/auth", authRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
