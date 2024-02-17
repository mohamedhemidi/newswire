import { describe, it, expect } from "vitest";
import { LoginSection } from "../components/LoginSection";
import { fireEvent, render, screen } from "utils/test-utils";

describe("Login Section", () => {

  it.skip("login successfully with correct credentials", async () => {
    render(<LoginSection />);
    // Empty credentials
    const emailInput = screen.getByTestId("email_field");
    const passwordInput = screen.getByTestId("password_field");

    fireEvent.change(emailInput, {
      target: { value: "mark@myer.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "12345678" } });

    expect(emailInput).toHaveValue("mark@myer.com");
    expect(passwordInput).toHaveValue("12345678");

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    // Login Error
    const successDiv = await screen.findByTestId("success");
    screen.debug();
    expect(successDiv).toBeInTheDocument();
  });


  it("renders error when login with empty credentials", async () => {
    render(<LoginSection />);
    // Empty credentials
    const emailInput = screen.getByTestId("email_field");
    const passwordInput = screen.getByTestId("password_field");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    // Click the submit

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    // Login Error
    const errorDiv = await screen.findByTestId("error");
    screen.debug();
    expect(errorDiv).toBeInTheDocument();
  });
});
