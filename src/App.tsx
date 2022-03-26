import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import routes from './Router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

function App() {
  return (
    <Router>
    {/* <ToastContainer /> */}
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
