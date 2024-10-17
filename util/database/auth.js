import axios from "axios";
import { AppName, MAIN_URL } from "../../constants/global";
import appConfig from "../../app.json";

export async function userCheck(UUID) {
  const AppVersion = appConfig.expo.version;
  const URL = `${MAIN_URL}/MobileUserAndVersionCheck`;
  try {
    const response = await axios.get(URL, {
      params: {
        UUID,
        AppName,
        AppVersion,
      },
    });
    if (
      response.data &&
      Array.isArray(response.data) &&
      response.data.length > 0
    ) {
      const [userData] = response.data;
      // console.log(userData);
      return userData;
    } else {
      throw new Error("Unexpected response format or empty data");
    }
  } catch (error) {
    let ErrMessage;
    if (error.response) {
      // The request was made, and the server responded with a status code
      // that falls out of the range of 2xx
      ErrMessage = `Error Response: ${JSON.stringify(error.response.data)}`;
      ErrMessage = ErrMessage + `Error Status: ${error.response.status}`;
      ErrMessage = ErrMessage + `Error Headers: ${error.response.headers}`;
    } else if (error.request) {
      // The request was made, but no response was received
      ErrMessage = ErrMessage + `No Response:', ${error.request}`;
    } else {
      // Something happened in setting up the request that triggered an Error
      ErrMessage = ErrMessage + `Axios Error:, ${error.message}`;
    }
    throw ErrMessage;
  }
}
