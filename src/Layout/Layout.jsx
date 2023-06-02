import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Link, Outlet, useLocation } from "react-router-dom";
import authService from "../services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { userLoaded } from "../redux/slices/userSlice";
import { toast } from "react-toastify";
import "./Layout.scss";
import CompleteProfileForm from "../components/CompleteProfileForm/CompleteProfileForm";
import userService from "../services/user.service";
import { useTranslation } from "react-i18next";
import Header from "../components/Header/Header";
import MenuIcon from "../assets/icons/menu.png";

import { Button, Offcanvas } from "react-bootstrap";
import IBSidebar from "../components/Sidebar/IBSidebar";
import classNames from "classnames";
import { getClientType } from "../utils/userUtils";

const Layout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentUser = useSelector((state) => state.user);
  useEffect(() => {
    if (!localStorage.getItem("warning")) {
      // alert("ATTENTION: this is a production environment");
      localStorage.setItem("warning", true);
    }
    if (!currentUser) {
      (async function () {
        try {
          const [userResponse, journeyResponse] = await Promise.all([
            userService.getCurrentUserProfile(),
            userService.getCurrentUserJourney(),
          ]);
          const user = {
            ...userResponse.result.data,
            journeys: journeyResponse.result && journeyResponse.result.journeys ||  [{status: false}]
          };
          dispatch(userLoaded(user));
        } catch (error) {
          toast.info("Session has been expired");
          authService.logout();
        }
      })();
    }
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!currentUser) return <div>Loading...</div>;
  const isIbPortal = location.pathname.toLocaleLowerCase().includes("/ib");
  if(getClientType(currentUser.clientType) == 2 && location.pathname.toLocaleLowerCase() === '/')  {
    window.location.href = '/ib';
  }
  return (
    <>
      <div className="layout-wrapper ltr">
        <div className="d-none d-lg-block">
          {isIbPortal ? <IBSidebar /> : <Sidebar />}
        </div>
        <Offcanvas show={show} onHide={handleClose} className="sidebar-drawer">
          <Offcanvas.Body className="p-0">
            {isIbPortal ? (
              <IBSidebar onClose={handleClose} />
            ) : (
              <Sidebar onClose={handleClose} />
            )}
          </Offcanvas.Body>
        </Offcanvas>
        <div>
          <Header handleShow={handleShow} />
          {/* <header
            className="d-flex align-items-center justify-content-between bg-white mb-4 mb-lg-5"
            style={{ height: 70 }}
          >
            <button onClick={handleShow} className="d-lg-none btn">
              <img src={MenuIcon} alt="" width={30} height={30} />
            </button>
            {currentUser.clientType == 3 && (
              <Link
                to={isIbPortal ? "/" : "/ib"}
                className="btn bg-white border rounded-0 ms-3 fw-semibold mx-3"
              >
                <div class="form-check form-switch m-0 d-flex align-items-center">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    checked={isIbPortal}
                    readOnly={true}
                    style={{ pointerEvents: "none" }}
                  />
                  <label
                    class={classNames(
                      "form-check-label ms-2 pointer",
                      isIbPortal && "text-primary"
                    )}
                  >
                    IB Portal
                  </label>
                </div>
              </Link>
            )}
            <div className="dropdown me-3 d-none d-lg-block ms-auto">
              <button
                className="btn btn-outline-light text-dark dropdown-toggle fs-6 d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span
                  style={{ width: 12, height: 12 }}
                  className="rounded-circle bg-success  me-2"
                ></span>
                <span className="pe-3"> {currentUser?.firstName}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link
                    to="../profile"
                    className="dropdown-item small fw-semibold"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="dropdown-item small fw-semibold"
                    onClick={() => authService.logout()}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </header> */}
          <main>
            <Outlet />
          </main>
        </div>
      </div>
      {!currentUser?.journeys[0].status && <CompleteProfileForm />}
    </>
  );
};

export default Layout;
