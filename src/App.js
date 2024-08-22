import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
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
  return user ? element : <Navigate to="/login" replace />;
};

function AppContent() {
  // const { user } = useAuth();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   setIsAuthenticated(!!user);
  // }, [user]);

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
}

export default App;
