import { Circle, Polygon } from "leaflet";

export interface Alert {
  id: number;
  description: string;
  isActive: boolean;
  areas: Area[];
  notifications: Notification[];
}

export interface Area {
  id: number;
  polygon: Polygon;
  circle: Circle;
  country: string;
  city: string;
  postalCode: string;
  street: string;
  houseNumber: string;
  alert: Alert;
}
