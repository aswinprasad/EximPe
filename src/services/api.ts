import axios from 'axios';

// const API_KEY = 'YOUR_API_KEY';
const API_KEY = 'b66a67d53becf1062b37dad3';
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

type ExchangeRateResponse = {
  convertedAmt: number | null;
  reqAmt: number | null;
};

export const getExchangeRates = async (
  baseCurrency: string,
  targetCurrency: string,
  amount: number,
  date: Date
): Promise<ExchangeRateResponse | null> => {
  try {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const response = await axios.get(
      `${BASE_URL}/${API_KEY}/history/${baseCurrency}/${year}/${month}/${day}/${amount}`
    );
    // return response.data.conversion_amounts[targetCurrency];
    return {
      convertedAmt: response?.data.conversion_amounts?.[targetCurrency],
      reqAmt: response?.data?.requested_amount,
    };
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return null;
  }
};

export const getSupportedCurrencies = async (): Promise<
  [string, string][] | null
> => {
  try {
    const response = await axios.get(`${BASE_URL}/${API_KEY}/codes`);
    return response?.data?.supported_codes;
  } catch (error) {
    console.error('Error fetching supported currencies:', error);
    return null;
  }
};
