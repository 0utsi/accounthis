import {
    Checkbox,
    CheckboxProps,
    FormControl,
    FormControlLabel,
    FormControlLabelProps,
    FormHelperText,
} from '@mui/material';
import {
    FieldPath,
    FieldValues,
    UseControllerProps,
    useController,
} from 'react-hook-form';
import { When } from 'react-if';
import { memo } from 'react';

function CheckboxInput<
    T extends FieldValues,
    S extends FieldPath<T> = FieldPath<T>,
>({
    name,
    checkboxProps,
    ...props
}: Omit<FormControlLabelProps, 'control'> &
    UseControllerProps<T, S> & { checkboxProps?: CheckboxProps }) {
    const {
        field: { value, onChange: handleOnChange },
        fieldState: { error },
    } = useController({ name });

    return (
        <FormControl error={!!error}>
            <FormControlLabel
                {...props}
                control={
                    <Checkbox
                        checked={value}
                        onChange={handleOnChange}
                        {...(checkboxProps || {})}
                    />
                }
            />
            <When condition={error?.message}>
                {() => <FormHelperText>{error?.message}</FormHelperText>}
            </When>
        </FormControl>
    );
}

export default memo(CheckboxInput) as typeof CheckboxInput;
