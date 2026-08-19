const express = require("express");
const cors = require("cors");

const subscriptionRoutes = require("./routes/subscriptionRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Subscription Tracker API is running"
  });
});

app.use("/api/subscriptions", subscriptionRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});