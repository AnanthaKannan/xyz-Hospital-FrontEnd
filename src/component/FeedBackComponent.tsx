import React, { useEffect, useState } from "react";
import Icons from "../reusable/Icons";
import TextEditor from "../reusable/TextEditor";
import Hb from "../reusable/Hb";
import { ClickButton } from "../reusable/Button";
import { useLoadContext } from "../reusable/LoaderContext";
// import { put } from "../service/feedback.service";
import { toast } from "react-toastify";
import parse from 'html-react-parser';
import Hc from "../reusable/Hc";
import { convertDate } from '../lib'
import PaginationReuse from "../reusable/PaginationReuse";
import { post, get, put, api } from '../service/api.service'

const FeedBackComponent = () => {
  const [text, setText] = useState("");
  const [rowData, setRowData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(2)

  const { setLoader } = useLoadContext();

  useEffect(() => {
    feedBackList(page);
  }, [page])

  const onHandleSubmit = async () => {
    console.log("submit");
    if(!text) return
    setLoader(true);
    const { isSuccess } = await post(api.feedback, {
      message: text,
      subject: 'Feedback',
      _hospitalId: sessionStorage.getItem("hospitalId"),
    });
    setLoader(false);
    if (!isSuccess) return

    toast.success("successfully added");
    console.log("Patient added successfully");
    feedBackList();
    setText("");
  };

  const feedBackList = async (skip=0) => {
    setLoader(true);
    const params = {
      project: 'message,createdAt',
      filter: 'isDeleted:eq:false',
      limit: perPage,
      skip: skip
    }
    const { isSuccess, data } = await get(api.feedback, params);
    setLoader(false);
    if (!isSuccess) return
    setTotalCount(totalCount);
    setRowData(data);
  };

  const onUpdateStatus = async(_id) => {
    console.log("update", _id);
    setLoader(true);
    const { isSuccess }  = await put(api.feedback, _id, {isDeleted: true});
    setLoader(false);
    if (!isSuccess) return
    toast.success("successfully deleted");
    feedBackList();
  };

  const handleChange = (text) => {
    setText(text);
  };

  
  return (
    <div>
      <Hb text="Share your feedback" />
      <TextEditor 
      id='feedback'
      handleChange={handleChange}
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
        <ClickButton
          className=""
          onClick={onHandleSubmit}
          text="Submit"
          color="primary"
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
              <div className="d-flex justify-content-between bg-hos rounded-top py-2 px-3">
              <div>{ convertDate(item.createdAt) }</div>
              <Icons icon="delete" onClick={() =>onUpdateStatus(item._id)} size={25} className='pointer' />
              </div>
              <div className="p-3">{ item.message ? parse(item.message) : ""}</div>   
            </div>
          </div>
        )
      }
      )}
    </div>
    <br />
    <PaginationReuse
    perPage={perPage}
    totalCount={totalCount}
    setPage={setPage}
    />
      <br />
    </div>
  );
};

export default FeedBackComponent;
