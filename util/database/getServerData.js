import axios from "axios";
import { MAIN_URL } from "../../constants/global";

export async function getBatchData(BranchOid) {
  const URL = `${MAIN_URL}/BatchList`;

  try {
    const response = await axios.get(URL, {
      params: {
        BranchOid,
      },
    });
    if (
      response.data &&
      Array.isArray(response.data) &&
      response.data.length > 0
    ) {
      const BatchData = response.data;
      return BatchData;
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

export async function getReasonData() {
  const URL = `${MAIN_URL}/ReasonList`;

  try {
    const response = await axios.get(URL);
    if (
      response.data &&
      Array.isArray(response.data) &&
      response.data.length > 0
    ) {
      const ReasonData = response.data;
      return ReasonData;
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

export async function getItemData(BranchOid) {
  const URL = `${MAIN_URL}/ItemList`;

  try {
    const response = await axios.get(URL, {
      params: {
        BranchOid,
      },
    });
    if (
      response.data &&
      Array.isArray(response.data) &&
      response.data.length > 0
    ) {
      const ItemData = response.data;
      return ItemData;
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

export async function getVehicleData(BranchOid) {
  const URL = `${MAIN_URL}/TwoWheelerVehicleNoList`;

  try {
    const response = await axios.get(URL, {
      params: {
        BranchOid,
      },
    });
    if (
      response.data &&
      Array.isArray(response.data) &&
      response.data.length > 0
    ) {
      const VehicleData = response.data;
      return VehicleData;
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

export async function getServerDateData() {
  const URL = `${MAIN_URL}/ServerDate`;

  try {
    const response = await axios.get(URL);
    if (
      response.data &&
      Array.isArray(response.data) &&
      response.data.length > 0
    ) {
      const ServerDateData = response.data;
      return ServerDateData;
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
