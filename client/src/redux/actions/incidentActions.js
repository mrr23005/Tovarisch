import { ADD_INCIDENT, GET_INCIDENTS , SET_INCIDENTS} from "../types";

export const addNewIncident = (newIncident, file) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token
    const formData = new FormData();
    for (let key in newIncident) {
      formData.append(key, newIncident[key]);
    }

    formData.append("file", file);

    const response = await fetch("http://localhost:3000/incident/new", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const newIncServer = await response.json();

    dispatch({
      type: ADD_INCIDENT,
      payload: {
        newIncServer,
      },
    });
  } catch (error) {
    console.log(error);
  }
};



export const getIncidents = (value) => {
  return {
    type: GET_INCIDENTS,
    payload: value,
  };
};

export const setIncidents = (value) => {
  return {
    type: SET_INCIDENTS,
    payload: value,
  };
};
