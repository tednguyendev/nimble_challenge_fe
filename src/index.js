import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignInPage from './pages/sign-in'

const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignInPage />,
    // children: [
    //   {
    //     path: "about",
    //     element: (<div>dasdsadas</div>),
    //   },
      // {
      //   path: "dashboard",
      //   element: <Dashboard />,
      //   loader: ({ request }) =>
      //     fetch("/api/dashboard.json", {
      //       signal: request.signal,
      //     }),
      // },
      // {
      //   element: <AuthLayout />,
      //   children: [
      //     {
      //       path: "login",
      //       element: <Login />,
      //       loader: redirectIfUser,
      //     },
      //     {
      //       path: "logout",
      //       action: logoutUser,
      //     },
      //   ],
      // },
    // ],
  },
  // {
  //   path: "reports",
  //   element: (
  //     <div>
  //       <h1>Reports page</h1>
  //     </div>
  //   ),
  // }
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);