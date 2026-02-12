import axios from "axios";

export async function getGeocode(address) {
  const response = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: address,
        format: "json",
        limit: 1,
      },
    },
  );

  return response.data;
}
