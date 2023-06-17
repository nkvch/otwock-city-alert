import { LatLngLiteral } from "leaflet";

export interface CircleArea {
  center: LatLngLiteral;
  radius: number;
}

export interface SquareArea {
  topLeft: LatLngLiteral;
  topRight: LatLngLiteral;
  bottomLeft: LatLngLiteral;
  bottomRight: LatLngLiteral;
}

export interface CustomArea {
  points: LatLngLiteral[];
}

export type Area = CircleArea | SquareArea | CustomArea;

export interface Address {
  road: string;
  city_district: string;
  town: string;
  county: string;
  state: string;
  'ISO3166-2-lvl4': string;
  postcode: string;
  country: string;
  country_code: string;
}

export interface LocationData {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  place_rank: number;
  category: string;
  type: string;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: Address;
  boundingbox: string[];
}
