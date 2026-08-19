function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function SubscriptionTable({
  subscriptions,
  onToggleStatus
}) {
  return (
    <section className="table-section">
      <div className="section-heading">
        <h2>Subscriptions</h2>
        <p>Your recurring services and upcoming renewals.</p>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Cost</th>
              <th>Monthly Cost</th>
              <th>Renewal Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {subscriptions.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="empty-state"
                >
                  No subscriptions added yet.
                </td>
              </tr>
            ) : (
              subscriptions.map((subscription) => (
                <tr
                  key={subscription.id}
                  className={
                    subscription.status === "paused"
                      ? "paused-row"
                      : ""
                  }
                >
                  <td>
                    <strong>
                      {subscription.serviceName}
                    </strong>
                  </td>

                  <td>
                    ₹{subscription.cost}
                    <span className="billing-cycle">
                      /{subscription.billingCycle}
                    </span>
                  </td>

                  <td>
                    ₹{subscription.monthlyCost}
                    /month
                  </td>

                  <td>
  {formatDate(subscription.nextRenewalDate)}

  {subscription.renewingSoon && (
    <span className="renewal-badge">
      Renewing Soon
    </span>
  )}

  {subscription.daysUntilRenewal >= 0 && (
    <div className="renewal-days">
      {subscription.daysUntilRenewal === 0
        ? "Renews today"
        : `${subscription.daysUntilRenewal} days left`}
    </div>
  )}
</td>

                  <td>
                    <span
                      className={`status-badge ${
                        subscription.status
                      }`}
                    >
                      {subscription.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="toggle-button"
                      onClick={() =>
                        onToggleStatus(
                          subscription.id,
                          subscription.status === "active"
                            ? "paused"
                            : "active"
                        )
                      }
                    >
                      {subscription.status === "active"
                        ? "Pause"
                        : "Resume"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default SubscriptionTable;