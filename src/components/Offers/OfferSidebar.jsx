import { useState } from "react";
import OfferCardData from "./OfferCardData";
import DynamicForm from "./DynamicForm";
import { api } from "../../lib/api";
import Swal from 'sweetalert2';

export default function OfferSidebar({ offer, onClose }) {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    if (!offer) return null;

    const defaultFields = [
        { key: 'full_name', label: 'Nombre completo', type: 'text', required: true, col_size: 12 },
        { key: 'id_number', label: 'Cédula / Pasaporte', type: 'text', required: true, col_size: 12 },
        { key: 'email', label: 'Correo electrónico', type: 'email', required: true, col_size: 12 },
        { key: 'phone', label: 'Teléfono', type: 'text', required: true, col_size: 12 }
    ];

    const fieldsToRender = offer.form?.fields || defaultFields;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await api.submitApplication({
                offer_uuid: offer.offer_uuid,
                fields: formData
            });

            if (result.success) {
                Swal.fire({
                    title: '¡Excelente!',
                    text: result.message,
                    icon: 'success',
                    confirmButtonColor: '#1e3a8a'
                });
                onClose();
            }
        } catch (error) {
            Swal.fire('Error', error.message, 'error');
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* 1. Overlay oscuro */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

            {/* 2. Tarjeta Flotante (Solo en Desktop) 
                Ocupa el espacio desde la izquierda hasta donde empieza el sidebar (480px)
            */}
            <div className="hidden lg:flex absolute inset-y-0 left-0 right-[480px] items-center justify-center pointer-events-none p-10">
                <div className="w-full max-w-md bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/20 pointer-events-auto animate-fade-in">
                    <div className="mb-4 text-brand-blue font-bold flex items-center gap-2">
                        <span className="w-8 h-1 bg-brand-yellow rounded-full"></span>
                        Resumen de la oferta
                    </div>
                    <OfferCardData offer={offer} />
                </div>
            </div>

            {/* 3. Sidebar (Derecha) */}
            <div className="relative h-full max-h-screen bg-white shadow-2xl md:border-l-4 md:border-brand-blue w-full sm:w-[480px] overflow-y-auto flex flex-col">

                {/* Header fijo */}
                <div className="bg-brand-blue p-4 flex justify-between items-center sticky top-0 z-20 shadow-md">
                    <h3 className="text-white font-bold text-lg">Solicitud de Crédito</h3>
                    <button onClick={onClose} className="bg-white/10 hover:bg-white/20 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all">✕</button>
                </div>

                <div className="p-6 flex-1">
                    {/* Tarjeta Integrada (Solo en Mobile/Tablet) */}
                    <div className="lg:hidden mb-8 bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                        <p className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-3">Detalles del producto</p>
                        <OfferCardData offer={offer} />
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-black text-blue-900 leading-tight">
                            ¡Estás a un paso!
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">Completa los datos para que el banco te contacte.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <DynamicForm
                            fields={fieldsToRender}
                            formData={formData}
                            setFormData={setFormData}
                        />

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-4 rounded-xl text-lg font-black tracking-wide shadow-xl transform transition hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3
                                    ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-yellow text-brand-blue hover:bg-yellow-400'}`}
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : "SOLICITAR AHORA"}
                            </button>

                            <p className="text-center text-[10px] text-gray-400 mt-5 leading-relaxed">
                                Seguridad Garantizada: Tus datos serán cifrados y enviados directamente a <strong>{offer.client_name}</strong> para procesar tu solicitud bajo estrictas normas de privacidad.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}