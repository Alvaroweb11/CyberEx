import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage } from '../pages';

function Navigation() {
  return (
    <BrowserRouter>







      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/*" element={<HomePage />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default Navigation;