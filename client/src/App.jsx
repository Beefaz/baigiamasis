import Login from "./pages/Login.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header.jsx";
import Projects from "./pages/Projects.jsx";
import NewProject from "./pages/NewProject.jsx";
import UpdateProject from "./pages/UpdateProject.jsx";
import {AuthProvider} from "./components/wrappers/AuthProvider.jsx";
import ViewProject from "./pages/ViewProject.jsx";
import Register from "./pages/Register.jsx";
import UserRoute from "./components/wrappers/UserRoute.jsx";
import AdminRoute from "./components/wrappers/AdminRoute.jsx";
import ControlPanel from "./components/ControlPanel.jsx";
import Page404 from "./pages/404.jsx";


const App = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Login/>
            }
          />
          <Route
            path="/register"
            element={
              <AdminRoute>
                <Header/>
                <ControlPanel/>
                <Register/>
              </AdminRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <UserRoute>
                <Header/>
                <ControlPanel/>
                <Projects/>
              </UserRoute>
            }
          />
          <Route
            path="/projects/new"
            element={
              <UserRoute>
                <Header/>
                <ControlPanel/>
                <NewProject/>
              </UserRoute>
            }
          />
          <Route
            path="/projects/:projectId"
            element={
              <UserRoute>
                <Header/>
                <ControlPanel/>
                <ViewProject/>
              </UserRoute>
            }
          />
          <Route
            path="/projects/:projectId/edit"
            element={
              <UserRoute>
                <Header/>
                <ControlPanel/>
                <UpdateProject/>
              </UserRoute>
            }
          />
          <Route path="*"
                 element={<Page404/>}
          >
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
