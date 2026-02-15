export function reverseGeocode({ lat, lng }) {
  return new Promise((resolve, reject) => {
    if (!window.google?.maps)
      return reject(new Error("Google Maps não carregou"));

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results?.[0]) resolve(results[0]);
      else reject(new Error(`Geocode failed: ${status}`));
    });
  });
}

export function getPlaceDetails({ map, placeId }) {
  return new Promise((resolve, reject) => {
    if (!window.google?.maps)
      return reject(new Error("Google Maps não carregou"));
    if (!map) return reject(new Error("Map instance não disponível"));

    const service = new window.google.maps.places.PlacesService(map);

    service.getDetails(
      {
        placeId,
        fields: [
          "place_id",
          "name",
          "formatted_address",
          "geometry",
          "types",
          "rating",
          "user_ratings_total",
          "website",
          "formatted_phone_number",
          "opening_hours",
        ],
      },
      (place, status) => {
        if (status === "OK" && place) resolve(place);
        else reject(new Error(`Places details failed: ${status}`));
      },
    );
  });
}
