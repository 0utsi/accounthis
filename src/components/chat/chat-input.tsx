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
      placeholderText = 'Type your message... 🎤',
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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Send
                size={20}
                className={`cursor-pointer ${
                  isLoading ? 'opacity-50' : 'hover:text-blue-500'
                }`}
                onClick={() => !isLoading && onSend()}
                aria-label="Send message"
              />
            </InputAdornment>
          ),
        }}
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'grey.300',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'grey.400',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
          },
          p: 0,
          ...sx,
        }}
      />
    );
  }
);

ChatInput.displayName = 'ChatInput';
export { ChatInput };
