import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const DummyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const state: any = location.state;
    if (state && state.backToNavigate) navigate(state.backToNavigate);
    else navigate("/");
  }, []);

  return <div>DummyPage</div>;
};

export default DummyPage;
