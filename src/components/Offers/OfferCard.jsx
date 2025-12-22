import { formatCurrency } from '../../utils.js';
import OfferCardData from './OfferCardData.jsx';

export default function OfferCard({ offer, onSelect, selected  }) {
  const calc = offer.calculation;
  const isSelected = selected?.offer_uuid === offer.offer_uuid;

  return (
  <div
      className={
        "w-full bg-white rounded-lg border p-6 relative cursor-pointer transition " +
        (isSelected
          ? "border-yellow-400 shadow-lg"
          : "border-gray-200 shadow-sm hover:shadow-md")
      }
      onClick={() => onSelect(offer)}
    >
        <OfferCardData offer={offer} />
      

     <button
        className={
          "w-full btn mt-2 " +
          (isSelected
            ? "text-white bg-brand-blue"
            : "bg-yellow-400 hover:bg-yellow-300 text-blue-900")
        }
      >
        {isSelected ? "Seleccionado" : "Ver Oferta"}
      </button>
    </div>
  );
}
