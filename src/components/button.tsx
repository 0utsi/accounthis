import React, { forwardRef } from 'react';
import { Button as MUIButton, ButtonProps as MUIButtonProps, CircularProgress } from '@mui/material';
import { SendIcon } from 'lucide-react';

export interface ButtonProps extends MUIButtonProps {
  isLoading?: boolean;
  loadingLabel?: React.ReactNode;
  spinnerPosition?: 'start' | 'end';
  spinnerSize?: number;
  className?: string;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      isLoading = false,
      loadingLabel,
      spinnerPosition = 'start',
      spinnerSize = 20,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const disabledState = disabled || isLoading;

    const content = isLoading && loadingLabel !== undefined
      ? loadingLabel
      : children;

    return (
      <MUIButton
        {...props}
        ref={ref}
        className={className}
        disabled={disabledState}
        aria-busy={isLoading}
        sx={{ ...props.sx, backgroundColor: 'red' }}
      >
        {isLoading && spinnerPosition === 'start' && (
          <CircularProgress
            size={spinnerSize}
            color="inherit"
            sx={{ mr: 1 }}
            aria-hidden="true"
          />
        )}

        {!isLoading && (
            <SendIcon size={64} />
        )}

        {content}

        {isLoading && spinnerPosition === 'end' && (
          <CircularProgress
            size={spinnerSize}
            color="inherit"
            sx={{ ml: 1 }}
            aria-hidden="true"
          />
        )}
      </MUIButton>
    );
  }
);

Button.displayName = 'Button';
export default Button;
