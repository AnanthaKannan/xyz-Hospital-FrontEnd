import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import routes from './Router'
import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <Router>
    <ToastContainer />
     <Routes>
     {
       routes.map((route) => {
          return <Route key={route.PATH} path={route.PATH} element={route.COMPONENT} />
       })
     }
     </Routes>
 </Router>
  );
}

export default App;
