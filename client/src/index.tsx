import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider, theme } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddEmployee } from "./pages/add-employee";
import { Employees } from "./pages/employees";
import { Register } from "./pages/register";
import  MafiaGame  from "./pages/information";
import { Login } from "./pages/login";
import { Employee } from "./pages/employee";
import { Status } from "./pages/status";
import { EditEmployee } from "./pages/edit-employee";
import { Auth } from "./features/auth/auth";
import { Paths } from "./paths";
import { Event } from "./pages/event";
import { Events } from "./pages/events";
import { AddFeedback } from "./pages/feedback";
import { EditEvent } from "./pages/edit-event";
import "./index.css";
import { AddEvent } from "./pages/add-event";
import { StatusEvent } from "./pages/status-event";


const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Employees />,
  }, 
  {
    path: Paths.feedback,
    element: <AddFeedback />,
  },
  {
    path: Paths.event,
    element: <Events />,
  },
  {
    path: Paths.information,
    element: <MafiaGame />,
  },
  {
    path: Paths.login,
    element: <Login />,
  },
  {
    path: Paths.register,
    element: <Register />,
  },
  {
    path: Paths.eventAdd,
    element: <AddEvent />,
  },
  {
    path: `${Paths.event}/:id`,
    element: <Event />,
  },
  {
    path: `${Paths.eventEdit}/:id`,
    element: <EditEvent />,
  },
  {
    path: Paths.employeeAdd,
    element: <AddEmployee />,
  },
  {
    path: `${Paths.employee}/:id`,
    element: <Employee />,
  },
  {
    path: `${Paths.employeeEdit}/:id`,
    element: <EditEmployee />,
  },
  {
    path: `${Paths.status}/:status`,
    element: <Status />,
  },
  {
    path: `${Paths.statusEvent}/:status`,
    element: <StatusEvent />,
  },

]);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
      theme={{
        
        algorithm: theme.darkAlgorithm,
  
      
      }}
      >
        <Auth>
          <RouterProvider router={router} />
        </Auth>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
