import React, { useState } from "react";

// Sample transaction data for Stage 1.2 (will be replaced with real YNAB data in Stage 2)
const SAMPLE_TRANSACTIONS = [
  {
    id: 1,
    description: "Local Coffee Shop",
    amount: 5.5,
    isLocal: true,
  },
  {
    id: 2,
    description: "National Chain Restaurant",
    amount: 15.0,
    isLocal: false,
  },
  {
    id: 3,
    description: "Tucson Bookstore",
    amount: 24.99,
    isLocal: true,
  },
  {
    id: 4,
    description: "Gas Station",
    amount: 45.0,
    isLocal: false,
  },
  {
    id: 5,
    description: "Local Farmer's Market",
    amount: 35.75,
    isLocal: true,
  },
  {
    id: 6,
    description: "Big Box Store",
    amount: 120.0,
    isLocal: false,
  },
];

function ImpactCard({ data }) {
  const multiplier = data.isLocal ? 1.43 : 0.43;
  const impact = (data.amount * multiplier).toFixed(2);

  return (
    <li className="dashboard__card">
      <p className="dashboard__card-description">{data.description}</p>
      <p className="dashboard__card-amount">${data.amount.toFixed(2)}</p>
      <p className="dashboard__card-impact">
        Impact: ${impact} {data.isLocal ? "📍 Local" : "🌍 National"}
      </p>
    </li>
  );
}

function DashboardPage() {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <section className="dashboard">
      <h2 className="dashboard__title">Main Dashboard</h2>
      <p className="dashboard__description">
        Track budgets, monitor impact initiatives, and align community spending
        with your mission.
      </p>

      <ul className="dashboard__list">
        {SAMPLE_TRANSACTIONS.slice(0, visibleCount).map((transaction) => (
          <ImpactCard key={transaction.id} data={transaction} />
        ))}
      </ul>

      {/* Button disappears when all elements are rendered */}
      {visibleCount < SAMPLE_TRANSACTIONS.length && (
        <button
          className="dashboard__show-more-button"
          onClick={handleShowMore}
        >
          Show more
        </button>
      )}
    </section>
  );
}

export default DashboardPage;
