import React, { useState } from "react";
import TextEditor from "../reusable/TextEditor";
import Hb from "../reusable/Hb";
import { ClickButton } from "../reusable/Button";
import { useLoadContext } from "../reusable/LoaderContext";
import { post, get } from "../service/patientRecord.service";
import { toast } from "react-toastify";

const FeedBackComponent = () => {
  const [text, setText] = useState("");
  const [rowData, setRowData] = useState([]);

  const { setLoader } = useLoadContext();

  const onHandleSubmit = async () => {
    console.log("submit");
    setLoader(true);
    const result = await post({
      description: text,
      status: false,
      disease: "feeling sick",
    });
    console.log("result", result.status);
    setLoader(false);
    if (result.status !== 201) {
      toast.error("Oops! Something went wrong. Please try again later.");
      return;
    }

    toast.success("successfully added");
    console.log("Patient added successfully");
    feedBackList();
    setText("");
  };

  const feedBackList = async () => {
    setLoader(true);
    // const query =  `?query={"_id" : ${patientDetails._id} }`
    const result = await get(null);
    console.log("result", result.status);
    setLoader(false);
    if (result.status !== 200) {
      toast.error("Oops! Something went wrong. Please try again later.");
      return;
    }
    setRowData(result.data);
  };

  return (
    <div>
      <Hb text="Share your feedback" />
      <TextEditor text={text} setText={setText} />

      <br />
      <div className="d-flex justify-content-end">
        <ClickButton
          className="mx-4"
          onClick={() => setText("")}
          text="Cancel"
          color="default"
          id="patient-cancel"
        />
        <ClickButton
          className=""
          onClick={onHandleSubmit}
          text="Submit"
          color="secondary"
          id="submit"
        />
      </div>
    </div>
  );
};

export default FeedBackComponent;
