import { useState } from "react";
import parse from "html-react-parser";
import { toast } from "react-toastify";

import { convertDate, sweetConfirmation } from "@/lib";
import {
  LoadingOverlayComp,
  ClickButton,
  LoadingClickButton,
  TextEditor,
  Hb,
  Hc,
  Icons,
  PaginationReuse,
} from "@/reusable";
import {
  useGetFeedBacksQuery,
  useUpdateFeedbackMutation,
  useAddFeedbackMutation,
} from "@/service";

const FeedBackComponent = () => {
  const [text, setText] = useState("");
  const [page, setPage] = useState(0);
  const perPage = 2;

  const {
    data: { data: rowData = [], tc: totalCount = 0 } = {},
    isFetching: isFeedbackFetching,
  } = useGetFeedBacksQuery({
    project: "message,createdAt",
    filter: "isDeleted:eq:false",
    limit: perPage,
    skip: page,
  });

  const [updateFeedBack, { isLoading: isUpdating }] =
    useUpdateFeedbackMutation();
  const [addFeedBack, { isLoading: isAdding }] = useAddFeedbackMutation();

  const onHandleSubmit = async () => {
    if (!text) return;
    const sendData = {
      message: text,
      subject: "Feedback",
      _hospitalId: localStorage.getItem("hospitalId"),
    };
    addFeedBack(sendData)
      .unwrap()
      .then(() => {
        setText("");
        toast.success("successfully added");
      })
      .catch((rejected) => {
        console.error(rejected);
        toast.error("Oops! Something went wrong. Please try again later.");
      });
    // dispatch(addFeedBackThunk(sendData));
  };

  /* In the frontend we can see this as a delete,
  but in the backend itself it is consider as a delete
   we just change the status from delete to false */
  const onUpdateStatus = async (_id: string) => {
    console.log("update", _id);
    sweetConfirmation(async () => {
      updateFeedBack({ id: _id, body: { isDeleted: true } })
        .unwrap()
        .then(() => toast.success("successfully deleted"))
        .catch((rejected) => {
          console.error(rejected);
          toast.error("Oops! Something went wrong. Please try again later.");
        });
    }, "Yes, delete it!");
  };

  return (
    <div>
      <Hb text="Share your feedback" />
      <LoadingOverlayComp loading={isAdding}>
        <TextEditor
          id="feedback"
          handleChange={(textContent) => setText(textContent)}
          placeholder="Enter your feedback here"
          value={text}
        />

        <br />
        <div className="d-flex justify-content-end">
          <ClickButton
            className="mx-4"
            onClick={() => setText("")}
            text="Cancel"
            id="patient-cancel"
          />
          <LoadingClickButton
            className=""
            onClick={onHandleSubmit}
            text="Submit"
            color="primary"
            id="submit"
            loading={isAdding}
          />
        </div>
      </LoadingOverlayComp>

      <LoadingOverlayComp loading={isFeedbackFetching || isUpdating}>
        <div className="patient-description">
          {rowData.length > 0 && <Hc text="Feedback's" />}
          {rowData.map((item: any) => (
            <div key={item._id} className="card mt-2 shadow-sm">
              <div className="">
                <div className="d-flex justify-content-between bg-hos rounded-top py-2 px-3">
                  <div>{convertDate(item.createdAt)}</div>
                  <Icons
                    icon={item.loading ? "loader" : "delete"}
                    onClick={() => onUpdateStatus(item._id)}
                    size={25}
                    className="pointer"
                  />
                </div>
                <div className="p-3">
                  {item.message ? parse(item.message) : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
        <br />
        <PaginationReuse
          perPage={perPage}
          totalCount={totalCount}
          setPage={setPage}
        />
        <br />
      </LoadingOverlayComp>
    </div>
  );
};

export default FeedBackComponent;
