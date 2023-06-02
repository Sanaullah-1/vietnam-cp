import authService from "../services/auth.service";


export const checkEmailAvailability = async (email) => {

    try {
        const { result } = await authService.checkEmailAvailability(email);
        return result.availability;
    } catch (error) { }
};
export const checkPhoneAvailability = async (phone) => {

    try {
        const { result } = await authService.checkPhoneAvailability(phone);

        return result.availability;
    } catch (error) { }
};
export const validateEmailPin = async (pin, email) => {

    try {
        const { isSuccess } = await authService.validateEmailPin(pin, email);

        return isSuccess;
    } catch (error) { }
};
export const sendPinToEmail = async (email) => {
    try {
        const { isSuccess } = await authService.sendPinToEmail(email);

        return isSuccess;
    } catch (error) { }
};
export default {
    checkEmailAvailability,
    checkPhoneAvailability,
    validateEmailPin,
    sendPinToEmail
}