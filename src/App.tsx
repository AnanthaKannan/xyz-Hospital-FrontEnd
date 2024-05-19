import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";

import routes from "./Router";
import Container from "./reusable/Container";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-toastify/dist/ReactToastify.css";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./App.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.PATH}
            path={route.PATH}
            element={
              route.NAV ? (
                <Container title={route.TITLE}>
                  <Suspense fallback="Loading....">{route.COMPONENT}</Suspense>
                </Container>
              ) : (
                <Suspense fallback="Loading....">{route.COMPONENT}</Suspense>
              )
            }
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
