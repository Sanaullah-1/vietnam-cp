import { Link, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Accounts from "./pages/Accounts/Accounts";
import Accupay from "./pages/Accupay/Accupay";
import BankAccounts from "./pages/Bank Accounts/BankAccounts";
import Dashboard from "./pages/Dashboard/Dashboard";
import Deposit from "./pages/Deposit/Deposit";
import InteralTransfer from "./pages/Internal Transfer/InternalTransfer";
import NewAccount from "./pages/New Account/NewAccount";
import PartnershipRequest from "./pages/Partnership Request/PartnershipRequest";
import Partnership from "./pages/Partnership/Partnership";
import Platform from "./pages/Platform/Platform";
import Profile from "./pages/Profile/Profile";
import Withdrawal from "./pages/Withdrawal/Withdrawal";
import PrivateRoutes from "./utils/PrivateRoute";
import authService from "./services/auth.service";
import MyApplication from "./pages/My Application/MyApplication";
import ProfileSettings from "./pages/Profile Settings/ProfileSettings";
import Activities from "./pages/Activities/Activities";
import Login from "./pages/authentication/Login/Login";
import Register from "./pages/authentication/Register/Register";
import ForgotPassword from "./pages/authentication/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/authentication/ResetPassword/ResetPassword";
import RegisterRedirect from "./pages/authentication/RegisterRedirect/RegisterRedirect";

import { ToastContainer } from "react-toastify";
import MyDocuments from "./pages/My Documents/MyDocuments";
import Reports from "./pages/Reports/Reports";
import BankAccountForm from "./pages/Bank Accounts/components/BankAccountForm";
import WebTrader from "./pages/WebTrader/WebTrader";
import RegisterPinVerification from "./pages/authentication/Register/components/RegisterPinVerification";
import UploadDocuments from "./pages/My Documents/components/UploadDocuments";
import IBDashboard from "./pages/IB Dashboard/IBDashboard";
import "react-toastify/dist/ReactToastify.css";
import IBMyClients from "./pages/IB My Clients/IBMyClients";

import IBInternalTransfer from "./pages/IB Internal Transfer/IBInternalTransfer";
import IBStructures from "./pages/IB Structures/IBStructures";
import IBWithdrawal from "./pages/IB Withdrawal/IBWithdrawal";
import IBStatement from "./pages/IB Statement/IBStatement";
import i18n from "./i18n/i18n";

function App() {

  i18n.on("languageChanged", lng => {
    document.documentElement.dir = i18n.dir();
    document.documentElement.lang = lng;
  })
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Layout />}>
            <Route path="/ib">
              <Route index element={<IBDashboard />} />
              <Route path="withdrawal" element={<IBWithdrawal />} />
              <Route
                path="internal-transfer"
                element={<IBInternalTransfer />}
              />
              <Route path="new-account" element={<NewAccount />} />

              <Route path="clients" element={<IBMyClients />} />
              <Route path="structures" element={<IBStructures />} />
              <Route path="statement" element={<IBStatement />} />


              <Route path="profile" element={<Profile />} />
              <Route path="my-settings" element={<ProfileSettings />} />
              <Route path="my-application" element={<MyApplication />} />
              <Route path="my-documents">
                <Route index element={<MyDocuments />} />
                <Route path=":state" element={<UploadDocuments />} />
              </Route>
              <Route path="activities" element={<Activities />} />
            </Route>
            <Route index element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdrawal" element={<Withdrawal />} />
            <Route path="/internal-transfer" element={<InteralTransfer />} />
            <Route path="/bank-accounts">
              <Route index element={<BankAccounts />} />
              <Route path=":state" element={<BankAccountForm />} />
            </Route>
            <Route path="/new-account" element={<NewAccount />} />
            <Route path="/accupay" element={<Accupay />} />
            <Route path="/reports" element={<Reports />} />

            <Route path="/platform" element={<Platform />} />
            <Route path="/partnership" element={<Partnership />} />
            <Route
              path="/partnership-request"
              element={<PartnershipRequest />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-settings" element={<ProfileSettings />} />
            <Route path="/my-application" element={<MyApplication />} />
            <Route path="/my-documents">
              <Route index element={<MyDocuments />} />
              <Route path=":state" element={<UploadDocuments />} />
            </Route>
            <Route path="/web-trader" element={<WebTrader />} />

            <Route path="/activities" element={<Activities />} />
          </Route>
        </Route>
        <Route
          path="/login"
          element={
            authService.getCurrentUser() ? (
              <Navigate to="/" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/register"
          element={
            authService.getCurrentUser() ? (
              <Navigate to="/" replace />
            ) : (
              <Register />
            )
          }
        />
        <Route
          path="/verify-pin"
          element={
            authService.getCurrentUser() ? (
              <Navigate to="/" replace />
            ) : (
              <RegisterPinVerification />
            )
          }
        />
        <Route
          path="/forgot-password"
          element={
            authService.getCurrentUser() ? (
              <Navigate to="/" replace />
            ) : (
              <ForgotPassword />
            )
          }
        />
        <Route
          path="/reset-password"
          element={
            authService.getCurrentUser() ? (
              <Navigate to="/" replace />
            ) : (
              <ResetPassword />
            )
          }
        />
        <Route
          path="/Gate"
          element={
            authService.getCurrentUser() ? (
              <Navigate to="/" replace />
            ) : (
              <RegisterRedirect />
            )
          }
        />
        <Route
          path="*"
          element={
            <Link
              to="/"
              className="display-6 text-center mt-5 d-block text-decoration-none d-block h-100">
              Not found or not implemented yet. click to redirect home page
            </Link>
          }
        />
      </Routes>
    </>
  );
}

export default App;
