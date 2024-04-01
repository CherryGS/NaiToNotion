import { describe, test } from "vitest";

import App from "@pages/content/ui/app";
import { render, screen } from "@testing-library/react";

describe("appTest", () => {
  test("render text", () => {
    // given
    const text = "";

    // when
    render(<App />);

    // then
    screen.getByText(text);
  });
});
