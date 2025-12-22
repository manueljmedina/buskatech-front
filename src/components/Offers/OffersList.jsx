import { useState } from "react";
import OfferCard from "./OfferCard";
import OfferSidebar from "./OfferSidebar";

export default function OffersList({ results, displayAmount, count }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="relative space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Ofertas para <span class="ml-2 text-brand-lightBlue">{displayAmount}</span>
        </h1>
        {count > 0 && (
      
        <span class="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-brand-blue">{count} resultados</span>
        )}

       
      </div>

      {/* LISTADO DE OFERTAS - 2 COLUMNAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
        {results.map((o) => (
          <OfferCard
            key={o.offer_uuid}
            offer={o}
            onSelect={setSelected}
            selected={selected}
          />
        ))}
      </div>

      {/* SIDEBAR */}
      <OfferSidebar 
        offer={selected} 
        onClose={() => setSelected(null)} 
      />
    </div>
  );
}
