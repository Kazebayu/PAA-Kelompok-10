import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./components/Login";
import Register from "./components/Register";
import EditUser from "./components/EditUser";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import PersForm from "./components/PersForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="register" element={<Register/>}></Route>
        <Route path="dashboard" element={[<Navbar/>, <Dashboard/>]}></Route>
        <Route path="edit/:id" element={[<Navbar/>, <EditUser/>]}/>
        <Route path="personality/:id" element={[<Navbar/>, <PersForm/>]}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
