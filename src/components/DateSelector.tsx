import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { SelectSingleEventHandler } from 'react-day-picker';
import { Label } from './ui/label';

interface DateSelectorProps {
  value: Date | undefined;
  onChange: SelectSingleEventHandler;
}

const DateSelector = ({ value, onChange }: DateSelectorProps) => {
  return (
    <div className="w-full">
      {/* <label>Date:</label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      /> */}
      <Label htmlFor="date">Date:</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !value && 'text-muted-foreground'
            )}
            id="date"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={{ after: new Date() }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateSelector;
