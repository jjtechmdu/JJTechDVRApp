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
      timeout: 30000,
    });
    if (
      response.data &&
      Array.isArray(response.data) &&
      response.data.length > 0
    ) {
      const [userData] = response.data;
      return userData;
    } else {
      throw new Error("Unexpected response format or empty data");
    }
  } catch (error) {
    let ErrMessage;

    if (error.response) {
      // Server responded with a status code outside the 2xx range
      ErrMessage = `Error Response: Status ${
        error.response.status
      }, Data: ${JSON.stringify(error.response.data)}`;
    } else if (error.request) {
      // Request made but no response received
      if (error.message.includes("Network Error")) {
        ErrMessage = "Network Error! ";
      } else {
        ErrMessage = `No Response Received: ${error.message}`;
      }
    } else {
      // Request setup error or unknown error
      ErrMessage = `Axios Error: ${error.message}`;
    }

    // Optionally, log the error object for debugging
    console.error("Full Error Object:", error);

    // Throw an Error object for better stack trace and debugging
    throw new Error(ErrMessage);
  }
}
