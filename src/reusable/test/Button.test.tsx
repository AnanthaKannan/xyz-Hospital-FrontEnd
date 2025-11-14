import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  ClickButton,
  SubmitButton,
  LoadingClickButton,
  type ButtonType,
  type SubmitButtonType,
  type LoadingButtonType,
} from "../Button";

describe("ClickButton Component", () => {
  const setUp = (overrideProps = {}) => {
    const user = userEvent.setup();
    const mergeProps = { ...props, ...overrideProps };
    const { rerender } = render(<ClickButton {...mergeProps} />);
    const btn = screen.getByRole("button");
    return { btn, rerender, user };
  };

  const props: ButtonType = {
    onClick: jest.fn(),
    className: "bg-red",
    id: "123",
    isDisable: false,
    text: "click",
    color: "info",
  };

  it("Should render the Button with correct value", () => {
    const { btn } = setUp();
    expect(btn).toBeInTheDocument();
  });

  it("Should render the text", () => {
    const { btn } = setUp();
    expect(btn).toHaveTextContent(props.text!);
  });

  it("Should invoke the onclick function", async () => {
    const { btn, user } = setUp();
    await user.click(btn);
    expect(props.onClick).toHaveBeenCalled();
  });

  it("Should have correct properties", () => {
    const { btn } = setUp();
    expect(btn).toHaveAttribute("id", props.id);
    expect(btn).toHaveClass(props.className!);
  });

  it("Shout be disable the button", () => {
    const { btn: disabledButton, rerender } = setUp({ isDisable: true });

    expect(disabledButton).toBeDisabled();

    rerender(<ClickButton {...props} isDisable={false} />);
    const enabledButton = screen.getByRole("button");
    expect(enabledButton).not.toBeDisabled();
  });
});

describe("SubmitButton Component", () => {
  const setUp = (overrideProps = {}) => {
    const user = userEvent.setup();
    const mergeProps = { ...props, ...overrideProps };
    const { rerender } = render(<SubmitButton {...mergeProps} />);
    const btn = screen.getByRole("button");
    return { btn, rerender, user };
  };

  const props: SubmitButtonType = {
    className: "bg-red",
    id: "123",
    isDisable: false,
    text: "click",
    color: "info",
  };

  it("Should render the SubmitButton with correct value", () => {
    const { btn } = setUp();
    expect(btn).toBeInTheDocument();
  });

  it("Should render the text", () => {
    const { btn } = setUp();
    expect(btn).toHaveTextContent(props.text!);
  });

  it("Should have correct properties", () => {
    const { btn } = setUp();
    expect(btn).toHaveAttribute("id", props.id);
    expect(btn).toHaveClass(props.className!);
  });

  it("Shout be disable the button", () => {
    const { btn: disabledButton, rerender } = setUp({ isDisable: true });

    expect(disabledButton).toBeDisabled();

    rerender(<SubmitButton {...props} isDisable={false} />);
    const enabledButton = screen.getByRole("button");
    expect(enabledButton).not.toBeDisabled();
  });
});

describe("LoadingClickButton Component", () => {
  const props: LoadingButtonType = {
    onClick: jest.fn(),
    className: "bg-red",
    id: "123",
    isDisable: false,
    text: "click",
    color: "info",
  };

  const setUp = (overrideProps = {}) => {
    const user = userEvent.setup();
    const mergeProps = { ...props, ...overrideProps };
    const { rerender } = render(<LoadingClickButton {...mergeProps} />);
    const btn = screen.getByRole("button");
    return { btn, rerender, user };
  };

  it("Should render the LoadingClickButton with correct value", () => {
    const { btn } = setUp();
    expect(btn).toBeInTheDocument();
  });

  it("Should render the text", () => {
    const { btn } = setUp();
    expect(btn).toHaveTextContent(props.text!);
  });

  it("Should invoke the onclick function", async () => {
    const { btn, user } = setUp();
    await user.click(btn);
    expect(props.onClick).toHaveBeenCalled();
  });

  it("Should have correct properties", () => {
    const { btn } = setUp();
    expect(btn).toHaveAttribute("id", props.id);
    expect(btn).toHaveClass(props.className!);
  });

  it("Shout be disable the button", () => {
    const { btn: disabledButton, rerender } = setUp({ isDisable: true });

    expect(disabledButton).toBeDisabled();

    rerender(<ClickButton {...props} isDisable={false} />);
    const enabledButton = screen.getByRole("button");
    expect(enabledButton).not.toBeDisabled();
  });
});
