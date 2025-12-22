import OffersList from "./OffersList.jsx";
import { formatCurrency } from "../../utils.js";
import { useSearch } from "../../hooks/useSearch.js";


export default function SearchApp({ products }) {

  const {
    results, loading,
    type, setType,
    amount, setAmount,
    displayAmount, setDisplayAmount,
    search, updateUrl, handleAmountChange,
    handleAmountBlur
  } = useSearch(products);

  const handleSubmit = (e) => {
    e.preventDefault();
    search(type, amount);
    updateUrl(type, amount);
  };
  return (
    	<section id="search-section" className="max-w-7xl mx-auto px-4 py-10">

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* FORM */}
      <div className="bg-white p-5 rounded-lg shadow-md border-t-4 border-brand-blue">
        <h2 className="text-xl font-bold mb-4 text-blue-900">
          Bus<b className="text-brand-yellow">K</b>a {formatCurrency(amount)}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Tipo */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Tipo de producto
            </label>
            <select
              name="type"
              className="form-control w-full"
              value={type || ""}
              onChange={(e) => setType(e.target.value)}
              disabled={!products || products.length === 0}
            >
              {/* Opción placeholder */}
              <option value="" disabled>
                {products && products.length > 0
                  ? "Selecciona un producto"
                  : "No hay productos disponibles"}
              </option>

              {products?.length > 0 &&
                products.map((p) => (
                  <option key={p.uuid} value={p.uuid}>
                    {p.name}
                  </option>
                ))}
            </select>

          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Monto ($)
            </label>
            <input
              name="amount"
              type="text"
              value={displayAmount}
              onChange={handleAmountChange}
              onBlur={handleAmountBlur}
              className="form-control w-full"
            />
          </div>

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
      </div>

      {/* Resultados */}
      <div className="md:col-span-2">
        {results.length === 0 && !loading ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
            <span className="text-xl font-semibold">Sin resultados</span>
            <p className="mt-1 italic text-sm">
              Realiza una búsqueda para ver las ofertas disponibles.
            </p>
          </div>
        ) : (
          <OffersList
            results={results}
            displayAmount={formatCurrency(amount)}
            count={results.length}
          />
        )}
      </div>
    </div>
    	</section>
  );
}
