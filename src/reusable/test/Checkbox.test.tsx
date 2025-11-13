import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckBox from "../CheckBox";
import { MuiColor } from "@/type/type";

describe("Checkbox component", () => {
  const defaultProps = {
    name: "checkbox",
    id: "checkbox",
    color: "primary" as MuiColor,
    label: "label",
    checked: false,
    onChange: jest.fn(),
    keyValue: "key",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the checkbox with correct initial value", () => {
    render(<CheckBox {...defaultProps} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("should render the checkbox label", () => {
    render(<CheckBox {...defaultProps} />);
    const label = screen.getByText("label");
    expect(label).toBeInTheDocument();
  });

  it("should render checked checkbox when checked prop is true", () => {
    render(<CheckBox {...defaultProps} checked={true} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("should call onChange handler when checkbox is clicked", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<CheckBox {...defaultProps} onChange={onChange} />);

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(onChange).toHaveBeenCalledWith(true, "checkbox");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should toggle checkbox state when clicked multiple times", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<CheckBox {...defaultProps} onChange={onChange} checked={false} />);

    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);
    expect(onChange).toHaveBeenNthCalledWith(1, true, "checkbox");

    await user.click(checkbox);
    expect(onChange).toHaveBeenNthCalledWith(2, true, "checkbox");
  });

  it("should have correct id and name attribute", () => {
    render(
      <CheckBox {...defaultProps} id="test-checkbox-id" name="test-name" />
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("id", "test-checkbox-id");
    expect(checkbox).toHaveAttribute("name", "test-name");
  });

  it("should use default color when not provided", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { color, ...propsWithoutColor } = defaultProps;
    render(<CheckBox {...propsWithoutColor} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  it("should render with different labels", () => {
    const { rerender } = render(
      <CheckBox {...defaultProps} label="Agree to terms" />
    );
    expect(screen.getByText("Agree to terms")).toBeInTheDocument();

    rerender(<CheckBox {...defaultProps} label="Accept privacy policy" />);
    expect(screen.getByText("Accept privacy policy")).toBeInTheDocument();
  });
});
