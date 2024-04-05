import { describe, test } from "vitest";

import App from "@root/src/pages/content/ui/app1";
import { render, screen } from "@testing-library/react";

describe("appTest", () => {
  test("render text", () => {
    // given
    const text = "Test";

    // when
    render(<App />);

    // then
    screen.getByText(text);
  });
});
