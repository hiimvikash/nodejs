

import {
    Route,
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
  } from "react-router-dom";

  import Layout from "../pages/Layout";
  import Login from "../pages/Login";
  import PublicFace from "../pages/PublicFace";
  import Signup from '../pages/Signup';

  import DashLayout from "../pages/DashLayout";
  import Welcome from "../pages/Welcome";

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<PublicFace />} />
  
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
  
        <Route path="dash" element={<DashLayout />} >
          <Route index element={<Welcome />} />
          <Route path="notes" >
            {/* <Route index element={<NotesList />} /> */}
          </Route>
          <Route path="users">
            {/* <Route index element={<UsersList />} /> */}
          </Route>
        </Route>
  
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    )
  );
  
  function App() {
    return <RouterProvider router={router} />
  }
  
  export default App