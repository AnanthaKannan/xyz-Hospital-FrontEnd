import React, { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from 'react-icons/md';
import TextEditor from "../reusable/TextEditor";
import Hb from "../reusable/Hb";
import { ClickButton } from "../reusable/Button";
import { useLoadContext } from "../reusable/LoaderContext";
import { post, get, put } from "../service/feedback.service";
import { toast } from "react-toastify";
import parse from 'html-react-parser';
import Hc from "../reusable/Hc";
import Pagination from '@mui/material/Pagination';
import { pageChange } from "../lib"

const FeedBackComponent = () => {
  const [text, setText] = useState("");
  const [rowData, setRowData] = useState([]);
  const [totalCount, setTotalCount] = useState(7);

  const { setLoader } = useLoadContext();

  useEffect(() => {
    feedBackList();
  },[])

  const onHandleSubmit = async () => {
    console.log("submit");
    if(!text) return
    setLoader(true);
    const result = await post({
      message: text,
      subject: 'Feedback',
      _hospitalId: sessionStorage.getItem("hospitalId"),
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

  const feedBackList = async (skip=0) => {
    setLoader(true);
    const result = await get(`project=message,createdAt&filter=isDeleted:eq:false&limit=2&skip=${skip}&sort=_id:desc`);
    console.log("result", result.headers['x-total-count']);
    setLoader(false);
    if (result.status !== 200) {
      toast.error("Oops! Something went wrong. Please try again later.");
      return;
    }
    setRowData(result.data);
  };

  const onUpdateStatus = async(_id) => {
    console.log("update", _id);
    setLoader(true);
    const result = await put(_id, {isDeleted: true});
    console.log("result", result.status);
    setLoader(false);
    if (result.status !== 200) {
      toast.error("Oops! Something went wrong. Please try again later.");
      return;
    }
    toast.success("successfully deleted");
    feedBackList();
  };

  const onPageChange = (e, page) => {
    feedBackList(pageChange(page));
  }

  return (
    <div>
      <Hb text="Share your feedback" />
      <TextEditor 
      placeholder="Enter your feedback here"
      text={text} 
      setText={setText} />

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

      <br/>
      <br/>
      <div className='patient-description'>
      { rowData.length > 0 && <Hc text="Feedback's" /> }
      { 
      rowData.map((item: any, index: number) => {
        return (
          <div key={item._id} className='card mt-2 shadow-sm'>
            <div className="">
              <div className="d-flex justify-content-between bg-info rounded-top py-2 px-3">
              <div>{item.createdAt}</div>
              <MdOutlineDeleteOutline onClick={() =>onUpdateStatus(item._id)} size={25} className='pointer' />
              </div>
              <div className="p-3">{ parse(item.message) }</div>   
            </div>
          </div>
        )
      }
      )}
    </div>
    <br />
    <div className="d-flex align-items-end">
        <Pagination onChange={onPageChange} count={Math.ceil(totalCount/2)} color="primary" />
      </div>
      <br />
    </div>
  );
};

export default FeedBackComponent;
