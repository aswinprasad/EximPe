import { useState, useEffect } from 'react';
import { getExchangeRates, getSupportedCurrencies } from './services/api.ts';
import CurrencySelector from './components/CurrencySelector';
import AmountInput from './components/AmountInput';
import DateSelector from './components/DateSelector';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpDown } from 'lucide-react';
import './App.css';

const App = () => {
  const [baseCurrency, setBaseCurrency] = useState<string>('USD');
  const [targetCurrency, setTargetCurrency] = useState<string>('INR');
  const [amount, setAmount] = useState<number>(1);
  const [convertedAmount, setConvertedAmount] = useState<{
    convertedAmt: number | null;
    reqAmt: number | null;
  } | null>(null);
  const [currencies, setCurrencies] = useState<[string, string][]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  useEffect(() => {
    const fetchCurrencies = async () => {
      const data = await getSupportedCurrencies();
      if (data) {
        setCurrencies(data);
      }
    };
    fetchCurrencies();
  }, []);

  useEffect(() => {
    fetchExchangeRates();
  }, [baseCurrency, targetCurrency, date]);

  const fetchExchangeRates = async () => {
    if (!baseCurrency || !targetCurrency || !amount || !date) {
      return;
    }
    setIsLoading(true);
    const response = await getExchangeRates(
      baseCurrency,
      targetCurrency,
      amount,
      date
    );
    if (response && response.convertedAmt) {
      setConvertedAmount({
        convertedAmt: +response?.convertedAmt.toFixed(2),
        reqAmt: response?.reqAmt,
      });
    }
    setIsLoading(false);
  };

  const swapCurrencies = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-0 w-full h-3/4 bg-gradient-to-b from-purple-600 to-transparent"></div>
      <div className="z-10">
        <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-white">
          CURRENCY CONVERTER
        </h2>
        <h4 className="mt-2 text-center text-xs sm:text-sm text-gray-100">
          Get Real-Time Foreign Currency Exchange Rates
        </h4>
      </div>
      <div className="relative max-w-md w-full p-10 mt-6 shadow-2xl rounded-xl border-gray-400 bg-white">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            fetchExchangeRates();
          }}
        >
          <div className="flex flex-col justify-between items-center">
            <CurrencySelector
              label="From:"
              value={baseCurrency}
              onChange={setBaseCurrency}
              currencies={currencies}
            />
            <Button
              className="hover:bg-purple-100 focus:border-purple-500 mt-4"
              variant="outline"
              type="button"
              size="icon"
              onClick={swapCurrencies}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
            <CurrencySelector
              label="To:"
              value={targetCurrency}
              onChange={setTargetCurrency}
              currencies={currencies}
            />
          </div>
          <div className="flex justify-between gap-5">
            <AmountInput value={amount} onChange={setAmount} />
            <DateSelector value={date} onChange={setDate} />
          </div>
          <Button
            onClick={fetchExchangeRates}
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-700"
          >
            Convert <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <div>
            {/* <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
              {!!convertedAmount?.convertedAmt &&
                `${convertedAmount?.reqAmt} ${baseCurrency} = ${convertedAmount?.convertedAmt} ${targetCurrency}`}
            </h2> */}
            {!!convertedAmount?.convertedAmt && (
              <div className="mt-6 text-center text-2xl font-extrabold text-gray-900 flex justify-center items-center">
                <h4 className="mr-2 text-lg text-gray-500">
                  {convertedAmount?.reqAmt} {baseCurrency} ={' '}
                </h4>
                <h3 className="text-purple-700 text-3xl leading-none">
                  {convertedAmount?.convertedAmt} {targetCurrency}
                </h3>
              </div>
            )}
          </div>
        </form>
        {isLoading && (
          <div className="overlay">
            <div className="loader"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
