const subscriptionService = require("../services/subscriptionService");

const {
  enrichSubscription,
  calculateDashboardMetrics
} = require("../services/calculationService");

function getSubscriptions(req, res) {
  try {
    const subscriptions =
      subscriptionService.getAllSubscriptions();

    const enrichedSubscriptions =
      subscriptions.map(enrichSubscription);

    res.json({
      success: true,
      data: enrichedSubscriptions
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

function getDashboardMetrics(req, res) {
  try {
    const subscriptions =
      subscriptionService.getAllSubscriptions();

    const metrics =
      calculateDashboardMetrics(subscriptions);

    res.json({
      success: true,
      data: metrics
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to calculate dashboard metrics"
    });
  }
}

function updateSubscriptionStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["active", "paused"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be active or paused"
      });
    }

    const subscription =
      subscriptionService.updateSubscriptionStatus(
        id,
        status
      );

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found"
      });
    }

    res.json({
      success: true,
      message: `Subscription ${status} successfully`,
      data: subscription
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update subscription status"
    });
  }
}

module.exports = {
  getSubscriptions,
  createSubscription,
  getDashboardMetrics,
  updateSubscriptionStatus
};