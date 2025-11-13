import { render, screen } from "@testing-library/react";
import Ha from "../Ha";

describe("Ha Component", () => {
  const props = { text: "Title" };

  it("should render the Ha with initial property", () => {
    render(<Ha {...props} />);
    const haComp = screen.getByText("Title");
    expect(haComp).toHaveTextContent("Title");
  });

  it("should have correct className", () => {
    render(<Ha {...props} className="bg-primary" />);
    const haComp = screen.getByText("Title");
    expect(haComp).toHaveAttribute("class", "bg-primary");
  });
});
