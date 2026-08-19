import DashboardHeader from "./components/DashboardHeader";
import MetricCard from "./components/MetricCard";
import SubscriptionForm from "./components/SubscriptionForm";
import SubscriptionTable from "./components/SubscriptionTable";

function App() {
  const subscriptions = [];

  return (
    <div className="app">
      <main className="dashboard-container">
        <DashboardHeader />

        <section className="metrics-grid">
          <MetricCard
            title="Total Monthly Burn Rate"
            value="₹0"
            subtitle="Current active subscription spend"
          />

          <MetricCard
            title="Upcoming Renewals"
            value="0"
            subtitle="Renewing within 7 days"
          />
        </section>

        <SubscriptionForm />

        <SubscriptionTable
          subscriptions={subscriptions}
          onToggleStatus={() => {}}
        />
      </main>
    </div>
  );
}

export default App;