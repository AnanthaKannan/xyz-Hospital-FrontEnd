/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import Icons from '../reusable/Icons';

import TextEditor from '../reusable/TextEditor';
import Hb from '../reusable/Hb';
import { ClickButton } from '../reusable/Button';
import Hc from '../reusable/Hc';
import { convertDate } from '../lib';
import PaginationReuse from '../reusable/PaginationReuse';
import { sweetConfirmation } from '../lib/sweetAlart';
import { useAppSelector, useAppDispatch } from '../hooks'
import { listFeedBackThunk,
   addFeedBackThunk, 
  updateFeedBackThunk } from '../features/feedbackSlice';
import { FeedBackArg } from '../type/type'


const FeedBackComponent = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');
  const [page, setPage] = useState(0);
  const perPage = 2;

  const { data: rowData, tc: totalCount} = useAppSelector((state) => state.feedBack.feedBackList);
  const { refresh } = useAppSelector((state) => state.feedBack);

  const feedBackList = async (skip = 0) => {
    const params:FeedBackArg = {
      project: 'message,createdAt',
      filter: 'isDeleted:eq:false',
      limit: perPage,
      skip,
    }
    dispatch(listFeedBackThunk(params));
  };

  const onHandleSubmit = async () => {
    console.log('submit');
    if (!text) return;
    const sendData = {
      message: text,
      subject: 'Feedback',
      _hospitalId: localStorage.getItem('hospitalId'),
    }
    dispatch(addFeedBackThunk(sendData))
  };

  useEffect(() => {
    setText('');
    feedBackList(page);
  }, [page, refresh]);

  /* In the frontend we can see this as a delete,
  but in the backend itself it is consider as a delete
   we just change the status from delete to false */
  const onUpdateStatus = async (_id) => {
    console.log('update', _id);
    sweetConfirmation(async () => {
      dispatch(updateFeedBackThunk({_id, data: { isDeleted: true }}))
    }, 'Yes, delete it!');
  };

  return (
    <div>
      <Hb text="Share your feedback" />
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
          onClick={() => setText('')}
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

      <div className="patient-description">
        {rowData.length > 0 && <Hc text="Feedback's" />}
        {
          rowData.map((item: any) => (
            <div key={item._id} className="card mt-2 shadow-sm">
              <div className="">
                <div className="d-flex justify-content-between bg-hos rounded-top py-2 px-3">
                  <div>{convertDate(item.createdAt)}</div>
                  <Icons icon="delete" onClick={() => onUpdateStatus(item._id)} size={25} className="pointer" />
                </div>
                <div className="p-3">{item.message ? parse(item.message) : ''}</div>
              </div>
            </div>
          ))
        }
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
