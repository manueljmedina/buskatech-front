import { useState, useEffect } from "react";
import { api } from "../lib/api.js";
import { formatCurrency } from "../utils.js";

export function useSearch(products) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [amount, setAmount] = useState(16000);
  const [displayAmount, setDisplayAmount] = useState("16000");
  const [type, setType] = useState(products?.[0]?.uuid || "");

  // Leer URL solo en cliente
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);

    const initialType = params.get("type") || products?.[0]?.uuid;
    const initialAmount = Number(params.get("amount")) || 16000;

    setType(initialType);
    setAmount(initialAmount);
    setDisplayAmount(formatCurrency(initialAmount).replace("$", ""));

    if (params.get("type") || params.get("amount")) {
      search(initialType, initialAmount);
    }
  }, []);

  const search = async (t, a) => {
    setLoading(true);
    try {
      const res = await api.searchOffers({ type: t, amount: a });
      setResults(res.results || []);
    } finally {
      setLoading(false);
    }
  };

  const updateUrl = (type, amount) => {
    const params = new URLSearchParams();
    params.set("type", type);
    params.set("amount", amount);
    window.history.replaceState({}, "", `?${params.toString()}`);
  };

    const handleAmountChange = (e) => {
    const cleanVal = e.target.value.replace(/[^0-9]/g, "");
    setAmount(cleanVal ? Number(cleanVal) : 0);
    setDisplayAmount(cleanVal);
  };

  const handleAmountBlur = () => {
    setDisplayAmount(formatCurrency(amount).replace("$", ""));
  };




  return {
    results,
    loading,

    type,
    setType,

    amount,
    setAmount,

    displayAmount,
    setDisplayAmount,

    search,
    updateUrl,

     handleAmountChange,
      handleAmountBlur,
  };
}
