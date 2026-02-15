import { InfoWindow } from "@vis.gl/react-google-maps";

export function LocationInfoWindow({
  position,
  nameInput,
  setNameInput,
  address,
  isLoading,
  isError,
  onSave,
  onClose,
}) {
  if (
    !position ||
    !Number.isFinite(position.lat) ||
    !Number.isFinite(position.lng)
  ) {
    return null;
  }

  const canSave = Boolean(nameInput?.trim());

  return (
    <InfoWindow position={position} onCloseClick={onClose}>
      <div className="pp-card min-w-[240px] space-y-2">
        <p className="pp-title">
          {nameInput ? "Local encontrado" : "Novo local"}
        </p>

        <div className="text-xs pp-muted">
          <p>Lat: {position.lat.toFixed(5)}</p>
          <p>Lng: {position.lng.toFixed(5)}</p>
        </div>

        <div className="text-sm">
          {isLoading && <p className="pp-muted">🔄 Buscando endereço...</p>}
          {isError && <p className="text-ui-error">Erro ao buscar endereço</p>}
          {!isLoading && !isError && address && (
            <p className="pp-muted">📍 {address}</p>
          )}
        </div>

        <input
          autoFocus
          className="pp-input w-full"
          placeholder="Dê um nome ao local..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            e.preventDefault();
            if (canSave) onSave();
          }}
        />

        <button
          onClick={onSave}
          className={`pp-btn w-full ${!canSave ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={!canSave}
        >
          Salvar local
        </button>
      </div>
    </InfoWindow>
  );
}
