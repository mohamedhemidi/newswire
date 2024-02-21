import { describe, it, expect } from "vitest";
import { SignupSection } from "../components/SignupSection";
import { fireEvent, render, screen } from "utils/test-utils";
import { HttpResponse, http } from "msw";
import { PATH } from "constants/environment";
import { server } from "src/test/mocks/server";

describe("Signup Section", () => {
  it("Shows Error when submitting with empty credentials", async () => {
    server.use(
      http.post(PATH.userSignup, () => {
        return HttpResponse.json(
          {
            message: "The name field is required. (and 2 more errors)",
          },
          { status: 422 }
        );
      })
    );
    render(<SignupSection />);

    // Click the submit
    const signupButton = screen.getByRole("button", { name: "Signup" });
    fireEvent.click(signupButton);

    // Signup Error
    const errorText = await screen.findByText(/The name field is required/i);
    const errorDiv = await screen.findByTestId("error");

    screen.debug()

    expect(errorText).toBeInTheDocument();
    expect(errorDiv).toBeInTheDocument();
  });
});
