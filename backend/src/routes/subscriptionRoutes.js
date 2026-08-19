const express = require("express");

const {
  getSubscriptions,
  createSubscription,
  getDashboardMetrics
} = require("../controllers/subscriptionController");

const router = express.Router();

router.get("/", getSubscriptions);

router.post("/", createSubscription);

router.get("/dashboard", getDashboardMetrics);

module.exports = router;