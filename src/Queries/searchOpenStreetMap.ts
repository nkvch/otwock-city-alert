import { LocationData } from "../Components/Map/types";

interface OpenStreetMapSearchParams {
  q: string;
  format?: 'json' | 'xml' | 'html' | 'jsonv2';
  addressdetails?: 0 | 1;
  limit?: number;
  viewbox?: string;
  bounded?: 0 | 1;
  countrycodes?: string;
  accept_language?: string;
}

export function searchOpenStreetMap(params: OpenStreetMapSearchParams): Promise<LocationData[]> {

  if (!params.format) {
    params.format = 'json';
  }

  if (!params.accept_language) {
    params.accept_language = 'pl';
  }

  params.q = 'Otwock, ' + params.q;

  const url = `https://nominatim.openstreetmap.org/search?${new URLSearchParams(params as Record<string, any>).toString()}`;

  return fetch(url).then(response => response.json());
}
