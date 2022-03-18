import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import routes from './Router'
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
