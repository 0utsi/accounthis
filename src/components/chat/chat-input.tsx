import React, { forwardRef } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { Send } from 'lucide-react';

export interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  placeholderText?: string;
  sx?: SxProps<Theme>;
}

const ChatInput = forwardRef<HTMLInputElement, ChatInputProps>(
  (
    {
      value,
      onChange,
      onSend,
      isLoading = false,
      placeholderText = 'Whats up?',
      disabled,
      sx,
      ...props
    },
    ref
  ) => {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
        e.preventDefault();
        onSend();
      }
    };

    return (
      <TextField
        {...props}
        inputRef={ref}
        fullWidth
        variant="outlined"
        placeholder={placeholderText}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        disabled={disabled || isLoading}
        sx={{height: ""}}
      />
    );
  }
);

ChatInput.displayName = 'ChatInput';
export { ChatInput };
