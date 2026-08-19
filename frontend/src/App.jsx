import { useEffect, useState } from "react";

import DashboardHeader from "./components/DashboardHeader";
import MetricCard from "./components/MetricCard";
import SubscriptionForm from "./components/SubscriptionForm";
import SubscriptionTable from "./components/SubscriptionTable";

import {
  getSubscriptions,
  createSubscription,
  getDashboardMetrics
} from "./services/api";

function App() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [metrics, setMetrics] = useState({
    monthlyBurn: 0,
    upcomingRenewals: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setError("");

      const [subscriptionsResponse, metricsResponse] =
        await Promise.all([
          getSubscriptions(),
          getDashboardMetrics()
        ]);

      setSubscriptions(subscriptionsResponse.data);
      setMetrics(metricsResponse.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleSubscriptionAdded = async (subscription) => {
    await createSubscription(subscription);
    await loadDashboard();
  };

  return (
    <div className="app">
      <main className="dashboard-container">

        <DashboardHeader />

        {error && (
          <div className="global-error">
            {error}
          </div>
        )}

        <section className="metrics-grid">
          <MetricCard
            title="Total Monthly Burn Rate"
            value={`₹${metrics.monthlyBurn}`}
            subtitle="Current active subscription spend"
          />

          <MetricCard
            title="Upcoming Renewals"
            value={metrics.upcomingRenewals}
            subtitle="Renewing within 7 days"
          />
        </section>

        <SubscriptionForm
          onSubscriptionAdded={
            handleSubscriptionAdded
          }
        />

        {loading ? (
          <div className="loading-state">
            Loading subscriptions...
          </div>
        ) : (
          <SubscriptionTable
            subscriptions={subscriptions}
            onToggleStatus={() => {}}
          />
        )}

      </main>
    </div>
  );
}

export default App;