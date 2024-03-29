import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "src/redux/store";
import { BrowserRouter as Router } from "react-router-dom";

afterEach(() => {
  cleanup();
});

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    ),
    ...options,
  });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
