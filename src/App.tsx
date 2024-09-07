
import { useEffect } from 'react';
import { lazy } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
import AdminProtectedRoute from './components/ProtectedRoute/AdminProtectedRoute';
import DashboardLayout from "./components/Layout/DashboardLayout"
import axios from "axios";
import { server } from './constants/config';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists, userExists } from './redux/reducers/auth'
import PracticeSession from './pages/Sessions/PracticeSession';

const Home = lazy(() => import("./pages/Home"))
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"))
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"))
const Login = lazy(() => import("./pages/Login"))
const NotFound = lazy(() => import("./pages/NotFound"))

const App = () => {

  const dispatch = useDispatch();
  const { user, isAdmin } = useSelector((state: any) => state.auth);

  useEffect(() => {
    axios.get(`${server}/user/me`, { withCredentials: true })
      .then((res: any) => {
        dispatch(userExists(res.data.user));
      })
      .catch((err: any) => {
        console.log(err);
        dispatch(userNotExists());
      })
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/"
          element={
            <Layout user={user}>
              <Home />
            </Layout>}
        />
        <Route path="/dashboard"
          element={
            <ProtectedRoute user={user} isAdmin={isAdmin}>
              <DashboardLayout user={user}>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          } />

        <Route path="/session/practice"
          element={
            <ProtectedRoute user={user} isAdmin={isAdmin}>
              <DashboardLayout user={user}>
                <PracticeSession />
              </DashboardLayout>
            </ProtectedRoute>
          } />

        <Route path='/admin/dashboard'
          element={
            <AdminProtectedRoute user={user} isAdmin={isAdmin}>
              <DashboardLayout user={user}>
                <AdminDashboard />
              </DashboardLayout>
            </AdminProtectedRoute>
          }
        />

        <Route path="/login"
          element={
            <ProtectedRoute user={!user} isAdmin={isAdmin} redirect="/dashboard">
              <Login />
            </ProtectedRoute>
          } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
