import LoginPage from "./pages/LoginPage";
import CreateUserPage from "./pages/CreateUserPage";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";



function App() {

  return (
    <Router>
<Routes>
  <Route path="/" element={<LoginPage/>} />
  <Route path="/register" element={<CreateUserPage/>} />
  <Route path="/main" element={<MainPage/>} />
</Routes>
</Router>
  )
}

export default App