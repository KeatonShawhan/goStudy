import LoginPage from "./pages/LoginPage";
import CreateUserPage from "./pages/CreateUserPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/register" element={<CreateUserPage/>} />
        </Routes>
      </Router>
  )
}

export default App