import {
    FieldPath,
    FieldValues,
    UseControllerProps,
    useController,
} from 'react-hook-form';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { memo, useMemo } from 'react';

function DatePickerInput<
    T extends FieldValues,
    S extends FieldPath<T> = FieldPath<T>,
>({
    name,
    defaultValue,
    rules,
    noDirtyCheck = false,
    ...props
}: DatePickerProps<Date> &
    UseControllerProps<T, S> & {
        noDirtyCheck?: boolean;
    }) {
    const {
        field: { value, onChange: handleOnChange },
        fieldState: { error, isDirty },
    } = useController({ name, defaultValue, rules });

    const sx = useMemo(
        () => ({
            ...props.sx,
            '.MuiInputBase-root': {
                backgroundColor:
                    !noDirtyCheck && isDirty ? 'form.isDirty.main' : undefined,
            },
        }),
        [props.sx, isDirty, noDirtyCheck]
    );

    const slotProps = useMemo(
        () => ({
            textField: {
                error: !!error,
                helperText: error?.message,
            },
        }),
        [error]
    );

    return (
        <DatePicker
            {...props}
            sx={sx}
            slotProps={slotProps}
            value={value}
            onChange={handleOnChange}
        />
    );
}

export default memo(DatePickerInput) as typeof DatePickerInput;
