const express = require("express");

const {
  getSubscriptions,
  createSubscription,
  getDashboardMetrics,
  updateSubscriptionStatus
} = require("../controllers/subscriptionController");

const router = express.Router();

router.get("/dashboard", getDashboardMetrics);

router.get("/", getSubscriptions);

router.post("/", createSubscription);

router.patch("/:id/status", updateSubscriptionStatus);

module.exports = router;