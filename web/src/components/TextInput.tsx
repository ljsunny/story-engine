import { Textarea } from '@/components/ui/textarea';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TextInput({ value, onChange, placeholder }: TextInputProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">
        Add Context (Optional)
      </label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Enter keywords, notes, or context to guide the story..."}
        className="min-h-[120px] rounded-xl bg-card border-border shadow-soft focus:shadow-medium transition-shadow resize-none"
      />
      <p className="text-xs text-muted-foreground">
        Help guide the story by adding keywords, themes, or specific details you'd like included.
      </p>
    </div>
  );
}
