import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.monobank.ua/bank/currency",
});

const fetchCurrencyData = async () => {
  try {
    const response = await apiClient.get();
    return response.data;
  } catch (error) {
    console.error("Failed to fetch currency data:", error.message);
    throw new Error("Failed to fetch currency data");
  }
};

const getCachedCurrencyData = () => {
  const cachedCurrency = JSON.parse(localStorage.getItem("currency"));
  if (cachedCurrency && Date.now() - cachedCurrency.date < 3600000) {
    return cachedCurrency;
  }
  return null;
};

const cacheCurrencyData = (data) => {
  const now = Date.now();
  const currencyData = {
    date: now,
    usd: data.find(
      (item) => item.currencyCodeA === 840 && item.currencyCodeB === 980
    ),
    eur: data.find(
      (item) => item.currencyCodeA === 978 && item.currencyCodeB === 980
    ),
  };

  localStorage.setItem("currency", JSON.stringify(currencyData));
  return currencyData;
};

const getCurrency = async () => {
  const cachedCurrency = getCachedCurrencyData();
  if (cachedCurrency) {
    return cachedCurrency;
  }

  const data = await fetchCurrencyData();
  return cacheCurrencyData(data);
};

export default getCurrency;
