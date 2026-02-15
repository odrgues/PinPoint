import { Menu, X, Search as SearchIcon } from "lucide-react";

export function SearchBar({
  isOpen,
  onToggleMenu,
  text,
  onTextChange,
  inputRef,
}) {
  return (
    <div className="pointer-events-auto bg-ui-surface shadow-floating rounded-pill flex items-center p-1 border border-ui-border focus-within:ring-2 focus-within:ring-primary/20">
      <button
        type="button"
        onClick={onToggleMenu}
        className={`p-3 rounded-full transition-colors ${
          isOpen
            ? "bg-primary text-ui-surface"
            : "text-primary hover:bg-ui-background"
        }`}
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

      <SearchIcon size={20} className="mx-3 text-text-muted" />
    </div>
  );
}
