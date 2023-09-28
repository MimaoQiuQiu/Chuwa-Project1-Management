require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const authRoutes = require("./routes/auth");

// api for signup, signin, password reset
app.use("/api/auth", authRoutes);

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
