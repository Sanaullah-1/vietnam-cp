import axios from "axios";
import { userLoaded } from "../redux/slices/userSlice";
import store from "../redux/store";
import userService from "../services/user.service";

export async function fetchAndUpdateUserProfile() {
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
        store.dispatch(userLoaded(user));
    } catch (error) {
        throw new Error(error.response.data);

    }
}
export default {
    fetchAndUpdateUserProfile
}

export const getCustomerType = (value = 0) => {
    let rightsNum = value;
    const output = {
      isClient: false,
      isIb: false,
      isJoint: false,
      isCorporate: false,
      isCorporateIb: false
    };
    
    if (rightsNum === 0) return output;
    if (rightsNum > 0 && Math.floor(rightsNum / 16) >= 1)
      output.isCorporateIb = true;
    rightsNum %= 16;
    if (rightsNum > 0 && Math.floor(rightsNum / 8) >= 1)
      output.isCorporate = true;
    rightsNum %= 8;
    if (rightsNum > 0 && Math.floor(rightsNum / 4) >= 1) output.isJoint = true;
    rightsNum %= 4;
    if (rightsNum > 0 && Math.floor(rightsNum / 2) >= 1) output.isIb = true;
    rightsNum %= 2;
    if (rightsNum > 0 && Math.floor(rightsNum / 1) >= 1) output.isClient = true;
    return output;
  };

  export const getClientType = (value = 0) => {
    const type = getCustomerType(value);
    if((type. isClient || type.isCorporate) && (type.isIb || type.isCorporateIb)) {
        return 3;
    }
    if(type. isClient || type.isCorporate) {
        return 1;
    }
    if(type.isIb || type.isCorporateIb) {
        return 2;
    }
    return 1;
  }