// src/features/search/components/SearchBar.jsx
import { Menu, X, Search as SearchIcon } from "lucide-react";

export function SearchBar({
  isOpen,
  onToggleMenu,
  text,
  onTextChange,
  inputRef,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="pointer-events-auto bg-ui-surface shadow-floating rounded-pill flex items-center p-1 border border-ui-border focus-within:ring-2 focus-within:ring-primary/20"
      role="search"
    >
      <button
        type="button"
        onClick={onToggleMenu}
        className={`p-2 sm:p-3 rounded-full transition-colors ${
          isOpen
            ? "bg-primary text-ui-surface"
            : "text-primary hover:bg-ui-background"
        }`}
        aria-label={
          isOpen
            ? "Fechar menu de locais salvos"
            : "Abrir menu de locais salvos"
        }
        aria-expanded={isOpen}
        title={isOpen ? "Fechar Menu" : "Abrir Menu"}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <input
        ref={inputRef}
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        type="text"
        name="search"
        inputMode="search"
        autoComplete="off"
        placeholder="Pesquise no PinPoint"
        aria-label="Buscar endereço ou local"
        className="flex-1 min-w-0 bg-transparent border-none outline-none text-text-primary placeholder:text-text-muted text-base px-3 h-10"
      />

      <div className="h-6 w-px bg-ui-border mx-1" />

      <button
        type="submit"
        className="p-2 sm:p-3 text-accent hover:text-primary hover:bg-ui-background rounded-full transition-colors"
        aria-label="Pesquisar"
        title="Pesquisar"
      >
        <SearchIcon size={20} />
      </button>
    </form>
  );
}
