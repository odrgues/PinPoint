// src/features/map/utils/normalizeLatLng.js

// Garante {lat:number,lng:number} independentemente do tipo
// (Google LatLng com lat()/lng() ou objeto normal com lat/lng)
export function normalizeLatLng(latLng) {
  if (!latLng) return null;

  const lat = typeof latLng.lat === "function" ? latLng.lat() : latLng.lat;
  const lng = typeof latLng.lng === "function" ? latLng.lng() : latLng.lng;

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
}
