import "./App.css";
// @ts-expect-error TS(6142): Module './pages/Login' was resolved to '/Users/ryu... Remove this comment to see the full error message
import Login from "./pages/Login";
// @ts-expect-error TS(6142): Module './pages/Register' was resolved to '/Users/... Remove this comment to see the full error message
import Register from "./pages/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// @ts-expect-error TS(6142): Module './components/layout/AuthLayout' was resolv... Remove this comment to see the full error message
import AuthLayout from "./components/layout/AuthLayout";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { blue } from "@mui/material/colors";
// @ts-expect-error TS(6142): Module './components/layout/AppLayout' was resolve... Remove this comment to see the full error message
import AppLayout from "./components/layout/AppLayout";
// @ts-expect-error TS(6142): Module './pages/Home' was resolved to '/Users/ryut... Remove this comment to see the full error message
import Home from "./pages/Home";
// @ts-expect-error TS(6142): Module './pages/Memo' was resolved to '/Users/ryut... Remove this comment to see the full error message
import Memo from "./pages/Memo";

const App = () => {
  const theme = createTheme({
    palette: { primary: blue },
  });

  return (
    // @ts-expect-error TS(2749): 'ThemeProvider' refers to a value, but is being us... Remove this comment to see the full error message
    <ThemeProvider theme={theme}>
      // @ts-expect-error TS(2749): 'CssBaseline' refers to a value, but is being used... Remove this comment to see the full error message
      <CssBaseline />
      <BrowserRouter>
        // @ts-expect-error TS(2749): 'Routes' refers to a value, but is being used as a... Remove this comment to see the full error message
        <Routes>
          // @ts-expect-error TS(2749): 'Route' refers to a value, but is being used as a ... Remove this comment to see the full error message
          <Route path="/" element={<AuthLayout />}>
            // @ts-expect-error TS(2749): 'Route' refers to a value, but is being used as a ... Remove this comment to see the full error message
            <Route path="login" element={<Login />} />
            // @ts-expect-error TS(2304): Cannot find name 'path'.
            <Route path="register" element={<Register />} />
          </Route>
          // @ts-expect-error TS(2304): Cannot find name 'path'.
          <Route path="/" element={<AppLayout />}>
            // @ts-expect-error TS(2749): 'Route' refers to a value, but is being used as a ... Remove this comment to see the full error message
            <Route index element={<Home />} />
            // @ts-expect-error TS(2304): Cannot find name 'path'.
            <Route path="memo" element={<Home />} />
            // @ts-expect-error TS(2304): Cannot find name 'path'.
            <Route path="memo/:memoId" element={<Memo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
