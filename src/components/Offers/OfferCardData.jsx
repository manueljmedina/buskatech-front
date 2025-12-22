import { formatCurrency } from '../../utils.js';

export default function OfferCardData({ offer  }) {
  const calc = offer.calculation;

  return (

    <div>
      {calc?.net_disbursement && (
        <div className="absolute -top-3 left-4 right-4 bg-green-600 text-white text-center py-1.5 rounded-md shadow-md text-sm font-semibold">
          Monto Neto a Recibir: {formatCurrency(calc.net_disbursement)}
        </div>
      )}

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-4">
          {/* Logo con iniciales */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-700 text-white font-bold"
            aria-label="Logo"
          >
            {offer.client_name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">{offer.client_name}</h3>
            <p className="text-sm text-gray-500">{offer.offer_name}</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-blue-900">
            {formatCurrency(calc.monthly_payment)}
          </div>
          <div className="text-xs text-gray-600">Pago mensual</div>
        </div>
      </div>

      {/* Información del préstamo */}
      <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-gray-700">

        <div>
          <p className="text-gray-500">Tasa de interés</p>
          <p className="font-semibold">{calc.interest_rate_used}%</p>
        </div>

        <div>
          <p className="text-gray-500">Plazo</p>
          <p className="font-semibold">{calc.term_months} meses</p>
        </div>

        <div>
          <p className="text-gray-500">Pago Total Est.</p>
          <p className="font-semibold">{formatCurrency(calc.total_payment)}</p>
        </div>

        <div>
          <p className="text-gray-500">Ingreso Mínimo</p>
          <p className="font-semibold">{formatCurrency(calc.required_income)}</p>
        </div>

        {/* Otros valores opcionales */}
        {calc.total_interest !== undefined && (
          <div>
            <p className="text-gray-500">Interés total</p>
            <p className="font-semibold">{formatCurrency(calc.total_interest)}</p>
          </div>
        )}

        {calc.upfront_fees !== undefined && calc.upfront_fees > 0 && (
          <div>
            <p className="text-gray-500">Comisiones iniciales</p>
            <p className="font-semibold">{formatCurrency(calc.upfront_fees)}</p>
          </div>
        )}

        {calc.amount_requested !== undefined && (
          <div>
            <p className="text-gray-500">Monto solicitado</p>
            <p className="font-semibold">{formatCurrency(calc.amount_requested)}</p>
          </div>
        )}

        {calc.adjusted_amount !== undefined && calc.adjusted_amount !== calc.amount_requested && (
          <div>
            <p className="text-gray-500">Monto ajustado</p>
            <p className="font-semibold">{formatCurrency(calc.adjusted_amount)}</p>
          </div>
        )}

      </div>
    </div>
      

  
  );
}
