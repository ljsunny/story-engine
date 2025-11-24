import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';

interface SubmitButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function SubmitButton({ onClick, disabled, loading }: SubmitButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full h-14 text-lg font-medium rounded-xl bg-gradient-primary hover:opacity-90 shadow-medium hover:shadow-strong transition-all"
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Generating Your Story...
        </>
      ) : (
        <>
          <Sparkles className="w-5 h-5 mr-2" />
          Generate Story
        </>
      )}
    </Button>
  );
}
