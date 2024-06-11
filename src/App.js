import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";

import Home from "./Components/Pages/Home";
import History from "./Components/Pages/History";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import LoginPage from "./Components/Pages/LoginPage";
import Signup from "./Components/Pages/SignupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

//app
function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
