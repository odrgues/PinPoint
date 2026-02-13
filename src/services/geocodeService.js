// src/services/geocodeService.js
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export async function geocodeByAddress(query) {
  const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
  url.searchParams.set("address", query);
  url.searchParams.set("key", API_KEY);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Falha na requisição de geocoding");

  const data = await res.json();
  if (data.status !== "OK" || !data.results?.[0]) {
    throw new Error(data.error_message || "Endereço não encontrado");
  }

  const result = data.results[0];
  return {
    formatted_address: result.formatted_address,
    lat: result.geometry.location.lat,
    lng: result.geometry.location.lng,
  };
}
