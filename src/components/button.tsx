import React, { forwardRef } from 'react';
import { Button as MUIButton, ButtonProps as MUIButtonProps, CircularProgress } from '@mui/material';

export interface ButtonProps extends MUIButtonProps {
  isLoading?: boolean;
  loadingLabel?: React.ReactNode;
  spinnerPosition?: 'start' | 'end';
  spinnerSize?: number;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      isLoading = false,
      loadingLabel,
      spinnerPosition = 'start',
      spinnerSize = 20,
      disabled,
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
        disabled={disabledState}
        aria-busy={isLoading}
        sx={{ textTransform: 'none', ...props.sx }}
      >
        {isLoading && spinnerPosition === 'start' && (
          <CircularProgress
            size={spinnerSize}
            color="inherit"
            sx={{ mr: 1 }}
            aria-hidden="true"
          />
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
