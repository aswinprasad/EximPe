import { useState, useEffect } from 'react';
import { getExchangeRates, getSupportedCurrencies } from './services/api.ts';
import CurrencySelector from './components/CurrencySelector';
import AmountInput from './components/AmountInput';
import DateSelector from './components/DateSelector';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import './App.css';

const App = () => {
  const [baseCurrency, setBaseCurrency] = useState<string>('USD');
  const [targetCurrency, setTargetCurrency] = useState<string>('EUR');
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          CURRENCY CONVERTER
        </h2>
        <h4 className="mt-2 text-center text-sm text-gray-600">
          Check live foreign currency exchange rates
        </h4>
      </div>
      <div className="relative max-w-md w-full p-10 mt-6 shadow-lg rounded-xl border-gray-400">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            fetchExchangeRates();
          }}
        >
          <CurrencySelector
            label="From"
            value={baseCurrency}
            onChange={setBaseCurrency}
            currencies={currencies}
          />
          <CurrencySelector
            label="To"
            value={targetCurrency}
            onChange={setTargetCurrency}
            currencies={currencies}
          />
          <div className="flex justify-between gap-5">
            <AmountInput value={amount} onChange={setAmount} />
            <DateSelector value={date} onChange={setDate} />
          </div>
          <Button onClick={fetchExchangeRates} type="button" className="w-full">
            Convert <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <div>
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
              {!!convertedAmount?.convertedAmt &&
                `${convertedAmount?.reqAmt} ${baseCurrency} = ${convertedAmount?.convertedAmt} ${targetCurrency}`}
            </h2>
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
