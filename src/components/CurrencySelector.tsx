import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface CurrencySelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  currencies: [string, string][];
}

const CurrencySelector = ({
  label,
  value,
  onChange,
  currencies,
}: CurrencySelectorProps) => {
  return (
    <div className="w-full">
      <Label htmlFor="currency">{label}</Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger id="currency" className="w-full">
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          {currencies?.map(([code, name]) => (
            <SelectItem key={code} value={code}>
              {code} - {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySelector;
