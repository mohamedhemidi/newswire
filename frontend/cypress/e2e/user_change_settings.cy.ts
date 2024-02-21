describe("User Settings", () => {
  it("changes settings and updates news feed", () => {
    const API_BASE_URL = "http://localhost:8000/api";

    const delay = 1000;
    // Login
    cy.intercept("POST", `${API_BASE_URL}/auth/login`, {
      fixture: "login.json",
    }).as("loginUser");

    // Categories
    cy.intercept("GET", `${API_BASE_URL}/getCategories`, {
      fixture: "categories.json",
    }).as("getCategories");

    // User Settings
    cy.intercept("GET", `${API_BASE_URL}/user/settings`, {
      fixture: "user_settings.json",
    }).as("getUserSettings");
    // News Sources
    cy.intercept("GET", `${API_BASE_URL}/getSources`, {
      fixture: "news_sources.json",
    }).as("getNewsSources");
    // Update Settings
    cy.intercept("POST", `${API_BASE_URL}/user/settings/update`, {
      status: "Request was successful.",
      data: { message: "Settings are updated successfully!" },
    }).as("updateSettings");

    // Client Interaction:

    cy.visit("http://localhost:5173/login");

    cy.get("#email").type("mark@myer.com");
    cy.get("#password").type("12345678");
    cy.wait(2000);

    cy.get("#loginBtn")
      .click()
      .then(() => {
        // // Initial News
        cy.intercept("POST", `${API_BASE_URL}/news?page=1`, {
          fixture: "news_feed_auth.json",
        }).as("Initial_News");
      });

    cy.wait(2000);
    cy.wait("@loginUser");
    cy.get("button").contains("Settings").click();
    cy.wait(delay);

    cy.get("#select-categories").click();
    cy.wait(delay);

    cy.get("li").contains("News").click();
    cy.wait(delay);

    cy.get("button")
      .contains("Submit")
      .click()
      .then(() => {
        // News After settings Update
        cy.intercept("POST", `${API_BASE_URL}/news?page=1`, {
          fixture: "news_feed_after_settings_change.json",
        }).as("News_After_Settings_Update");
        cy.visit("http://localhost:5173");
      });
  });
});
