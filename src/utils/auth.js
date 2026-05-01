/**
 * SIMULATED AUTHENTICATION
 * By returning Promises, your App.jsx won't know the difference between
 * a "fake" login and a real one. Stage 2 will replace this with real API calls.
 */

// eslint-disable-next-line no-unused-vars
export const authorize = (email, password) => {
  return new Promise((resolve) => {
    // Simulate a successful login response
    resolve({ token: "fake-tucson-impact-token" });
  });
};

// eslint-disable-next-line no-unused-vars
export const checkToken = (token) => {
  return new Promise((resolve) => {
    // Simulate finding a user in the database
    resolve({
      data: {
        name: "Tucson Local",
        email: "resident@tucson.gov",
        _id: "65f7368dfb74bd6a92114c85",
      },
    });
  });
};
