// import React from "react";
// import { createRoot } from "react-dom/client";
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// import SignInPage from './pages/sign-in'
// import './styles/index.scss';

// const router = createBrowserRouter([
//   {
//     path: "/sign-in",
//     element: <SignInPage />,
//   },
//   {
//     path: "dashboard",
//     element: (
//       <div>
//         <h1>Dashboard</h1>
//       </div>
//     ),
//   }
// ]);

// createRoot(document.getElementById("root")).render(
//   <RouterProvider router={router} />
// );

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
