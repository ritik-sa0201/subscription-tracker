function calculateMonthlyCost(cost, billingCycle) {
  if (billingCycle === "monthly") {
    return cost;
  }

  if (billingCycle === "yearly") {
    return cost / 12;
  }

  return 0;
}

function calculateDaysUntilRenewal(nextRenewalDate) {
  const today = new Date();
  const renewalDate = new Date(nextRenewalDate);

  // Remove time component to compare calendar dates
  today.setHours(0, 0, 0, 0);
  renewalDate.setHours(0, 0, 0, 0);

  const difference =
    renewalDate.getTime() - today.getTime();

  return Math.ceil(
    difference / (1000 * 60 * 60 * 24)
  );
}

function isRenewingSoon(daysUntilRenewal) {
  return daysUntilRenewal >= 0 && daysUntilRenewal <= 7;
}

function calculateDashboardMetrics(subscriptions) {
  let monthlyBurn = 0;
  let upcomingRenewals = 0;

  subscriptions.forEach((subscription) => {
    const monthlyCost = calculateMonthlyCost(
      subscription.cost,
      subscription.billingCycle
    );

    const daysUntilRenewal =
      calculateDaysUntilRenewal(
        subscription.nextRenewalDate
      );

    const renewingSoon =
      isRenewingSoon(daysUntilRenewal);

    // Only ACTIVE subscriptions contribute to burn
    if (subscription.status === "active") {
      monthlyBurn += monthlyCost;
    }

    if (renewingSoon) {
      upcomingRenewals++;
    }
  });

  return {
    monthlyBurn: Number(monthlyBurn.toFixed(2)),
    upcomingRenewals
  };
}

function enrichSubscription(subscription) {
  const monthlyCost = calculateMonthlyCost(
    subscription.cost,
    subscription.billingCycle
  );

  const daysUntilRenewal =
    calculateDaysUntilRenewal(
      subscription.nextRenewalDate
    );

  const renewingSoon =
    isRenewingSoon(daysUntilRenewal);

  return {
    ...subscription,
    monthlyCost: Number(monthlyCost.toFixed(2)),
    daysUntilRenewal,
    renewingSoon
  };
}

module.exports = {
  calculateMonthlyCost,
  calculateDaysUntilRenewal,
  isRenewingSoon,
  calculateDashboardMetrics,
  enrichSubscription
};