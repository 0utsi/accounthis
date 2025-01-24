import {
    FieldPath,
    FieldValues,
    UseControllerProps,
    useController,
} from 'react-hook-form';
import {
    BaseTextFieldProps,
    StandardTextFieldProps,
    TextField,
} from '@mui/material';
import { memo, useMemo } from 'react';

function TextInput<
    T extends FieldValues,
    S extends FieldPath<T> = FieldPath<T>,
>({
    id,
    name,
    defaultValue,
    rules,
    noDirtyCheck = false,
    ...props
}: BaseTextFieldProps &
    UseControllerProps<T, S> &
    Omit<StandardTextFieldProps, 'variant'> & {
        noDirtyCheck?: boolean;
    }) {
    const {
        field: { value, onChange: handleChange },
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
        [isDirty, noDirtyCheck, props.sx]
    );

    return (
        <TextField
            id={id || name}
            sx={sx}
            fullWidth
            value={value}
            onChange={handleChange}
            autoComplete="off"
            error={!!error}
            helperText={error?.message}
            {...props}
        />
    );
}

export default memo(TextInput) as typeof TextInput;
