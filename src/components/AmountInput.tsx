import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
}

const AmountInput = ({ value, onChange }: AmountInputProps) => {
  return (
    <div className="w-full">
      <Label htmlFor="amount">Amount:</Label>
      <Input
        id="amount"
        type="number"
        step="0.01"
        placeholder="Enter Amount"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
};

export default AmountInput;
