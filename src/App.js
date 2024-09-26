import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Cart from "./Cart";
import RootLayout from "./RootLayout";
import LoginForm from "./login";
import { AuthProvider, useAuth } from "./Auth";

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  const location = useLocation();
  return user?.user.username ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

const AppContent = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public routes */}
        <Route path="/login" element={<LoginForm />} />

        {/* Protected routes */}
        <Route path="/" element={<ProtectedRoute element={<RootLayout />} />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
