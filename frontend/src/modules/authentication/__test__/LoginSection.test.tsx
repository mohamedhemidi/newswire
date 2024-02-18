import { describe, it, expect } from "vitest";
import { LoginSection } from "../components/LoginSection";
import { fireEvent, render, screen } from "utils/test-utils";
import { HttpResponse, http } from "msw";
import { PATH } from "constants/environment";
import { server } from "src/test/mocks/server";

afterEach(() => {
  server.resetHandlers();
});

describe("Login Section", () => {
  it("renders error when login with Wrong credentials", async () => {
    server.use(
      http.post(PATH.userLogin, () => {
        return HttpResponse.json(
          { message: "Credentials do not match" },
          { status: 401 }
        );
      })
    );

    render(<LoginSection />);

    // Put Empty credentials :
    const emailInput = screen.getByTestId("email_field");
    const passwordInput = screen.getByTestId("password_field");

    fireEvent.change(emailInput, { target: { value: "mark@myer.com" } });
    fireEvent.change(passwordInput, { target: { value: "123456789" } });

    expect(emailInput).toHaveValue("mark@myer.com");
    expect(passwordInput).toHaveValue("123456789");

    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);

    // Login Error
    const errorText = await screen.findByText(/credentials do not match/i);
    const errorDiv = await screen.findByTestId("error");
    screen.debug();
    expect(errorDiv).toBeInTheDocument();
    expect(errorText).toBeInTheDocument();
  });

  it("renders error when login with Empty credentials", async () => {
    server.use(
      http.post(PATH.userLogin, () => {
        return HttpResponse.json(
          { message: "The email field is required. (and 1 more error)" },
          { status: 422 }
        );
      })
    );
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
    const errorText = await screen.findByText(/the email field is required/i);
    const errorDiv = await screen.findByTestId("error");
    screen.debug();
    expect(errorText).toBeInTheDocument();
    expect(errorDiv).toBeInTheDocument();
  });
});
