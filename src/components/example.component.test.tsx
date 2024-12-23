import { render, screen } from "@testing-library/react";
import { ExampleComponent } from "./example.component";

describe("ExampleComponent", () => {
  it("renders the Next.js logo", () => {
    render(<ExampleComponent />);
    const logo = screen.getByAltText("Next.js logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/next.svg");
    expect(logo).toHaveAttribute("width", "180");
    expect(logo).toHaveAttribute("height", "38");
  });

  it("renders the instructions list with correct items", () => {
    render(<ExampleComponent />);

    // Check if both list items are present
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);

    // Check the content of the first list item
    expect(screen.getByText(/Get started by editing/i)).toBeInTheDocument();
    expect(screen.getByText("src/app/page.tsx")).toBeInTheDocument();

    // Check the content of the second list item
    expect(
      screen.getByText("Save and see your changes instantly.")
    ).toBeInTheDocument();
  });

  it("renders the action buttons with correct links", () => {
    render(<ExampleComponent />);

    // Check Deploy now button
    const deployButton = screen.getByRole("link", { name: /deploy now/i });
    expect(deployButton).toHaveAttribute(
      "href",
      "https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    );
    expect(deployButton).toHaveAttribute("target", "_blank");
    expect(deployButton).toHaveAttribute("rel", "noopener noreferrer");

    // Check Vercel logo in deploy button
    const vercelLogo = screen.getByAltText("Vercel logomark");
    expect(vercelLogo).toBeInTheDocument();
    expect(vercelLogo).toHaveAttribute("src", "/vercel.svg");

    // Check Docs button
    const docsButton = screen.getByRole("link", { name: /read our docs/i });
    expect(docsButton).toHaveAttribute(
      "href",
      "https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
    );
    expect(docsButton).toHaveAttribute("target", "_blank");
    expect(docsButton).toHaveAttribute("rel", "noopener noreferrer");
  });
});
