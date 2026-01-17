// alt for testing library
import { render } from "vitest-browser-react";
import { expect, test } from "vitest";

import Pizza from "../Pizza";

test("alt test renders on image", async () => {
  const name = "My favorite pizza";
  const src = "https://picsum.photos/200";
  const screen = render(<Pizza name={name} image={src} description="LOL" />);

  const img = screen.getByRole("img");
  await expect.element(img).toBeInTheDocument();
  await expect.element(img).toHaveAttribute("src", src);
  await expect.element(img).toHaveAttribute("alt", name);
});
