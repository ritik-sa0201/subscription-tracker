import { useState } from "react";

function SubscriptionForm({ onSubscriptionAdded }) {
  const [formData, setFormData] = useState({
    serviceName: "",
    cost: "",
    billingCycle: "monthly",
    nextRenewalDate: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await onSubscriptionAdded({
        serviceName: formData.serviceName,
        cost: Number(formData.cost),
        billingCycle: formData.billingCycle,
        nextRenewalDate: formData.nextRenewalDate
      });

      setFormData({
        serviceName: "",
        cost: "",
        billingCycle: "monthly",
        nextRenewalDate: ""
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="form-section">
      <div className="section-heading">
        <h2>Add Subscription</h2>
        <p>Add a recurring service to your tracker.</p>
      </div>

      <form
        className="subscription-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="serviceName">
            Service Name
          </label>

          <input
            id="serviceName"
            name="serviceName"
            type="text"
            placeholder="e.g. Netflix"
            value={formData.serviceName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cost">
            Cost
          </label>

          <input
            id="cost"
            name="cost"
            type="number"
            min="0"
            step="0.01"
            placeholder="e.g. 499"
            value={formData.cost}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="billingCycle">
            Billing Cycle
          </label>

          <select
            id="billingCycle"
            name="billingCycle"
            value={formData.billingCycle}
            onChange={handleChange}
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="nextRenewalDate">
            Next Renewal Date
          </label>

          <input
            id="nextRenewalDate"
            name="nextRenewalDate"
            type="date"
            value={formData.nextRenewalDate}
            onChange={handleChange}
            required
          />
        </div>

        {error && (
          <p className="form-error">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="primary-button"
          disabled={loading}
        >
          {loading
            ? "Adding..."
            : "Add Subscription"}
        </button>
      </form>
    </section>
  );
}

export default SubscriptionForm;