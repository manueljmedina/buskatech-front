import { useSearch } from "../../hooks/useSearch.js";

export default function FrmBasicCalculateReact({ products }) {
  const {
    type, setType,
    amount, setAmount,
    displayAmount, setDisplayAmount,
    search,
    updateUrl,
    loading
  } = useSearch(products);

  const handleSubmit = (e) => {
    e.preventDefault();
    search(type, amount);
    updateUrl(type, amount);

    // bajar al área donde está SearchApp
    const section = document.querySelector("#search-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {/* Tipo */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="form-control"
      >
        {products.map((p) => (
          <option key={p.uuid} value={p.uuid}>
            {p.name}
          </option>
        ))}
      </select>

      {/* Monto */}
      <input
        type="text"
        value={displayAmount}
        className="form-control"
        onChange={(e) => {
          const clean = e.target.value.replace(/[^0-9]/g, "");
          setAmount(Number(clean) || 0);
          setDisplayAmount(clean);
        }}
      />

      {/* Botón */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-yellow text-brand-blue btn"
      >
        {loading && (
          <span className="animate-spin border-2 border-t-transparent border-blue-900 rounded-full w-5 h-5 mr-2"></span>
        )}
        {loading ? "Buscando..." : "Buscar"}
      </button>
    </form>
  );
}
