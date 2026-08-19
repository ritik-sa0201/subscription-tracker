const subscriptionService = require("../services/subscriptionService");

function getSubscriptions(req, res) {
  try {
    const subscriptions = subscriptionService.getAllSubscriptions();

    res.json({
      success: true,
      data: subscriptions
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch subscriptions"
    });
  }
}

function createSubscription(req, res) {
  try {
    const {
      serviceName,
      cost,
      billingCycle,
      nextRenewalDate
    } = req.body;

    // Validation
    if (!serviceName || !serviceName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Service name is required"
      });
    }

    if (cost === undefined || cost === null || Number(cost) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Cost must be greater than 0"
      });
    }

    if (!["monthly", "yearly"].includes(billingCycle)) {
      return res.status(400).json({
        success: false,
        message: "Billing cycle must be monthly or yearly"
      });
    }

    if (!nextRenewalDate) {
      return res.status(400).json({
        success: false,
        message: "Next renewal date is required"
      });
    }

    const subscription =
      subscriptionService.createSubscription({
        serviceName: serviceName.trim(),
        cost,
        billingCycle,
        nextRenewalDate
      });

    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: subscription
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create subscription"
    });
  }
}

module.exports = {
  getSubscriptions,
  createSubscription
};