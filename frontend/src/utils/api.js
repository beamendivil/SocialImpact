/**
 * SIMULATED DATABASE API
 * Since Stage 1 requires real YNAB API but also allows saving items (simulated),
 * this file handles "Saved Community Goals" that will eventually go to MongoDB.
 */

// This simulates fetching "Saved Community Goals" from your future MongoDB
export function getSavedGoals() {
  return new Promise((resolve) =>
    resolve([
      {
        _id: "65f7371e7bce9e7d331b11a0",
        name: "Reid Park Zoo Expansion",
        targetAmount: 5000,
        currentImpact: 1250.5,
        description: "Community-funded improvements for local wildlife.",
      },
      {
        _id: "66fae3a5488272ac5507672d",
        name: "Better Streets Fund",
        targetAmount: 10000,
        currentImpact: 4300.75,
        description: "Pothole repair and bike lane expansion in Tucson.",
      },
    ]),
  );
}

// This simulates saving a new goal to the database
export function saveGoal(goalData) {
  return new Promise((resolve) => {
    resolve({
      ...goalData,
      _id: "65f7371e7bce9e7d331b11b1", // Mocked ID
    });
  });
}
