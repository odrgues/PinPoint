import { AdvancedMarker } from "@vis.gl/react-google-maps";

export function ClickMarker({ position }) {
  if (!position) return null;
  return <AdvancedMarker position={position} title="Local selecionado" />;
}
