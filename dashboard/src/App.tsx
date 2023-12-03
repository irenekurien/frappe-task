import { FrappeProvider } from "frappe-react-sdk";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthForm, Dashboard, Loan } from "./pages";
function App() {
  return (
    <div className="App">
      <FrappeProvider socketPort={import.meta.env.VITE_SOCKET_PORT ?? ''}>
        <BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
          <Routes>
          <Route path="/auth" element={<AuthForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/loan/:id" element={<Loan />} />
          </Routes>
        </BrowserRouter>
      </FrappeProvider>
    </div>
  );
}

export default App;
