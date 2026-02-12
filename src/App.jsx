import { useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps"; // Importante: O Provider tem que envolver tudo
import { Search } from "./components/Search/Search"; // Certifique-se que o caminho está certo
import { Map } from "./components/Map/Map";

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Coloque sua API Key aqui ou em uma variável de ambiente (import.meta.env.VITE_GOOGLE_MAPS_API_KEY)
  const API_KEY = "AIzaSyCzTXD4BjxuPJu7g5KSqstCkGzF1S_8ywQ";

  return (
    <APIProvider apiKey={API_KEY}>
      {/* CONTAINER PRINCIPAL 
          relative: Para servir de referência para o 'absolute' da barra de busca.
          h-screen w-full: Garante que o app ocupe a janela toda.
      */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* --- CAMADA 1: A Barra Flutuante (Fica por cima) --- */}
        {/* Como ela tem position: absolute dentro dela, ela vai se posicionar relative a este pai */}
        <Search onLocationSelect={(loc) => setSelectedLocation(loc)} />

        {/* --- CAMADA 2: O Mapa (Fica no fundo) --- */}
        <div className="w-full h-full">
          <Map selectedLocation={selectedLocation} />
        </div>
      </div>
    </APIProvider>
  );
}

export default App;
