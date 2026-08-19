const express = require("express");

const {
  getSubscriptions,
  createSubscription
} = require("../controllers/subscriptionController");

const router = express.Router();

router.get("/", getSubscriptions);
router.post("/", createSubscription);

module.exports = router;