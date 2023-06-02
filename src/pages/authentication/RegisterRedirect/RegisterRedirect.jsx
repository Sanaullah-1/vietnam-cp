import React, { useEffect } from "react";
import {
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import { useTranslation } from "react-i18next";
import authService from "../../../services/auth.service";
import userService from "../../../services/user.service";
import { userLoaded } from "../../../redux/slices/userSlice";
import { useDispatch } from "react-redux";


const GateLogin = (props) => {
  const { t } = useTranslation()
  const navigate = useNavigate();

  const [searchParams, setSearhParams] = useSearchParams();
  const token = searchParams.get("token");
  const lang = searchParams.get("lang") || 'en-gb';
  const dispatch = useDispatch();
  
  const loadUser = async () => {
    try {
      const [
        userResponse,
        journeyResponse,
      ] = await Promise.all([
        userService.getCurrentUserProfile(),
        userService.getCurrentUserJourney(),
      ]);
      const user = {
        ...userResponse.result.data,
        journeys: journeyResponse.result && journeyResponse.result.journeys ||  [{status: false}],
      };
      dispatch(userLoaded(user));
      navigate("/", { replace: true });
    } catch(err) {
      navigate("/login");
    }
  }
  useEffect(() => {
    try {
      authService.gateLogin(token);
      loadUser();
    } catch(err) {
      navigate("/login");
    }
  }, []);


  return (
    <div className="pt-5 text-center">
        <div className="spinner-grow text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
  );
};

export default GateLogin;
