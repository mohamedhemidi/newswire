describe("News for Authenticated user", () => {
  const API_BASE_URL = "http://localhost:8000/api";

  it("fetch user preference feed", () => {
    cy.intercept("POST", `${API_BASE_URL}/auth/login`, {
      fixture: "login.json",
    }).as("getGuestNews");
    cy.intercept("POST", `${API_BASE_URL}/news?page=1`, {
      fixture: "news_feed_auth.json",
    }).as("getGuestNews");
    cy.intercept("GET", `${API_BASE_URL}/getCategories`, {
      fixture: "categories.json",
    }).as("getCategories");
    cy.visit(`http://localhost:5173/login`);
    cy.get("#email").type("mark@myer.com");
    cy.get("#password").type("12345678");
    cy.get("#loginBtn").click();
  });
});
