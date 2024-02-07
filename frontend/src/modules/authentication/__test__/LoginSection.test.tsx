import { describe, it, expect } from "vitest";
import { LoginSection } from "../components/LoginSection";
import { render, screen } from "utils/test-utils";

describe("Login Section", () => {
  it("renders login form heading", () => {
    render(<LoginSection />);
    const loginHeading = screen.getByRole("heading", { name: "Login" });
    expect(loginHeading).toBeInTheDocument();
  });
});
