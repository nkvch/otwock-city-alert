import config from "../config";

const url = `${config.apiUrl}/admin/allDeviceLocations`;

export interface UserDataApi {
  id: string;
  fcmToken: string;
  lastCoordinates: {
    x: number;
    y: number;
    radius: number;
  };
  timestamp: string;
}

const mapUserData = (data: UserDataApi) => {
  const { id, lastCoordinates, timestamp: whenLastUpdate } = data;
  const { x: lat, y: lng } = lastCoordinates;

  return {
    id,
    lat,
    lng,
    whenLastUpdate
  };
}

export const getUsersLocations = async () => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: UserDataApi[] = await response.json();

  return data.filter(({ lastCoordinates }) => lastCoordinates).map(mapUserData);
}
