import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import CreateItem from "./pages/CreateItem/CreateItem";
import ItemDetails from "./pages/ItemDetails/ItemDetails";
import EditItem from "./pages/EditItem/EtidItem";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
   
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateItem />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/item/:id/edit" element={<EditItem />} />
        </Route>
      </Routes>
   
  );
}

export default App;
