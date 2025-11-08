import { render, screen, act } from "@testing-library/react";
import type { Mock } from "jest-mock";
// import userEvent from "@testing-library/user-event";
import FeedBackComponent from "../FeedBackComponent";

import {
  useGetFeedBacksQuery,
  useAddFeedbackMutation,
  useUpdateFeedbackMutation,
} from "../../service/feedback";

jest.mock("../../config", () => ({
  apiURL: "http://unitest.com",
  patientRecord: "patientRecord",
  patient: "patient",
  doctor: "doctor",
}));

jest.mock("../../service/feedback.ts");

jest.mock("react-quill", () => {
  return ({
    value,
    onChange,
    placeholder,
    id,
  }: {
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
    id: string;
  }) => (
    <textarea
      data-testid={id}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
});

describe("FeedBack Component", () => {
  it("Initial rendering validation", async () => {
    (useGetFeedBacksQuery as Mock).mockReturnValue({
      data: {
        data: [
          {
            _id: "674ac9be030fcbae54d6f9fe",
            message: "helo work",
            createdAt: "2024-11-30T08:15:58.454Z",
          },
          {
            _id: "674ac9b2030fcbae54d6f9fb",
            message: "ee xx",
            createdAt: "2024-11-30T08:15:46.032Z",
          },
        ],
        tc: 2,
      },
      isFetching: false,
    });

    (useAddFeedbackMutation as Mock).mockReturnValue([
      jest.fn(),
      { isLoading: false },
    ]);
    (useUpdateFeedbackMutation as Mock).mockReturnValue([
      jest.fn(),
      { isLoading: false },
    ]);

    await act(async () => {
      render(<FeedBackComponent />);
    });

    const heading = screen.getAllByRole("heading");
    expect(heading[0]).toHaveTextContent("Share your feedback");
    expect(heading[1]).toHaveTextContent("Feedback's");
  });
});
