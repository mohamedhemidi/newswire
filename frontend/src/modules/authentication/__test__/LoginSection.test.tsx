import { describe, it, expect } from "vitest";
import { LoginSection } from "../components/LoginSection";
import { fireEvent, render, screen } from "utils/test-utils";

describe("Login Section", () => {
  it("renders login form heading", () => {
    render(<LoginSection />);
    const loginHeading = screen.getByRole("heading", { name: "Login" });
    expect(loginHeading).toBeInTheDocument();
  });
  it("renders error when login with empty credentials", async () => {
    render(<LoginSection />);

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    // Login Error
    const errorDiv = await screen.findByTestId("error");
    expect(errorDiv).toBeInTheDocument();
  });
});
