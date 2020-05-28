import axios from "axios";
import {toast} from "react-toastify";
import {MAPS_KEY} from "./keys";

export const geoCode = async (address: string) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${MAPS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    const firstPlace = results[0];

    if (firstPlace) {
      const {
        formatted_address = "",
        geometry: {
          location: { lat, lng }
        }
      } = firstPlace;
      return { formatted_address, lat, lng };
    }
    else {
      return false;
    }

  } else {
    toast.error(data.error_message);
    return false;
  }
};

export const reverseGeoCode = async (lat: number, lng: number) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_KEY}`;
  const { data } = await axios(URL);
  if (!data.error_message) {
    const { results } = data;
    const firstPlace = results[0];
    if (!firstPlace) {
      return false;
    }
    return firstPlace.formatted_address;
  } else {
    toast.error(data.error_message);
    return false;
  }
};
