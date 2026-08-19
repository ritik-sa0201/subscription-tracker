const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/subscriptions.json");

function readSubscriptions() {
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
}

function writeSubscriptions(subscriptions) {
  fs.writeFileSync(
    dataPath,
    JSON.stringify(subscriptions, null, 2)
  );
}

function getAllSubscriptions() {
  return readSubscriptions();
}

function createSubscription(subscriptionData) {
  const subscriptions = readSubscriptions();

  const subscription = {
    id: Date.now().toString(),
    serviceName: subscriptionData.serviceName,
    cost: Number(subscriptionData.cost),
    billingCycle: subscriptionData.billingCycle,
    nextRenewalDate: subscriptionData.nextRenewalDate,
    status: "active",
    createdAt: new Date().toISOString()
  };

  subscriptions.push(subscription);
  writeSubscriptions(subscriptions);

  return subscription;
}

function updateSubscriptionStatus(id, status) {
  const subscriptions = readSubscriptions();

  const subscriptionIndex = subscriptions.findIndex(
    (subscription) => subscription.id === id
  );

  if (subscriptionIndex === -1) {
    return null;
  }

  subscriptions[subscriptionIndex].status = status;
  subscriptions[subscriptionIndex].updatedAt =
    new Date().toISOString();

  writeSubscriptions(subscriptions);

  return subscriptions[subscriptionIndex];
}

module.exports = {
  getAllSubscriptions,
  createSubscription,
  updateSubscriptionStatus
};