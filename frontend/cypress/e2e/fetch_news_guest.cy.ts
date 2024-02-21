describe("News for Guest user", () => {
  const API_BASE_URL = "http://localhost:8000/api";

  it("fetch news for guest", () => {
    cy.intercept("POST", `${API_BASE_URL}/news?page=1`, {
      fixture: "news_feed_guest.json",
    }).as("getGuestNews");
    cy.intercept("GET", `${API_BASE_URL}/getCategories`, {
      fixture: "categories.json",
    }).as("getCategories");
    cy.visit("http://localhost:5173");
  });
});
