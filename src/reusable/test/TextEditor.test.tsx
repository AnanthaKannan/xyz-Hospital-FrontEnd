import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TextEditor from "../TextEditor";

// Mock react-quill as a textarea for testing
export type TextEditorProps = {
  value?: string;
  id: string;
  placeholder?: string;
  onChange: (content: string) => void;
  errorMsg?: string;
};

jest.mock("react-quill", () => {
  return ({ value, onChange, placeholder, id }: TextEditorProps) => (
    <textarea
      data-testid={id}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
});

describe("TextEditor Component", () => {
  const defaultProps = {
    id: "text-editor-id",
    placeholder: "Enter content",
    value: "Hello world",
    handleChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the editor with correct initial value and placeholder", () => {
    render(<TextEditor {...defaultProps} errorMsg="" />);

    const editor = screen.getByTestId(defaultProps.id);

    expect(editor).toBeInTheDocument();
    expect(editor).toHaveAttribute("placeholder", defaultProps.placeholder);
    expect(editor).toHaveValue(defaultProps.value);
  });

  it("calls handleChange when typing in the editor", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(
      <TextEditor
        {...defaultProps}
        errorMsg=""
        value=""
        handleChange={handleChange}
      />
    );

    const editor = screen.getByTestId(defaultProps.id);
    await user.type(editor, "test");

    expect(handleChange).toHaveBeenCalledTimes(4);
    // why here it is return only one character, because it is not render
    expect(handleChange).toHaveBeenCalledWith("t");
    expect(handleChange).toHaveBeenCalledWith("e");
    expect(handleChange).toHaveBeenCalledWith("s");
    expect(handleChange).toHaveBeenCalledWith("t");
  });

  it("does not render an error message when errorMsg is empty", () => {
    render(<TextEditor {...defaultProps} errorMsg="" />);

    const errorText = screen.queryByTestId(`error-${defaultProps.id}`);
    expect(errorText).not.toBeInTheDocument();
  });

  it("renders an error message when errorMsg is provided", () => {
    const errorMsg = "Something went wrong";

    render(<TextEditor {...defaultProps} errorMsg={errorMsg} />);

    const errorText = screen.getByTestId(`error-${defaultProps.id}`);
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveTextContent(errorMsg);
  });
});
