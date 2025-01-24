import {
    FormControl,
    FormControlProps,
    FormHelperText,
    IconButton,
    InputAdornment,
    OutlinedInput,
} from '@mui/material';
import {
    FieldPath,
    FieldValues,
    UseControllerProps,
    useController,
    useFormContext,
} from 'react-hook-form';
import Select, { BaseSelectProps } from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import { useTranslation } from 'react-i18next';
import { memo, useMemo } from 'react';
import isEmpty from 'lodash/isEmpty';
import { When } from 'react-if';
import get from 'lodash/get';
import difference from 'lodash/difference';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function areArraysEqual<T extends any[], R extends any[]>(
    arr1: T,
    arr2: R
) {
    return (
        arr1.length === arr2.length &&
        difference(arr1, arr2).length === 0 &&
        difference(arr2, arr1).length === 0
    );
}

export interface SelectInputProps extends BaseSelectProps {
    formControlProps?: FormControlProps;
    loading?: boolean;
    closable?: boolean;
    closeOnChange?: boolean;
}

function SelectInput<
    T extends FieldValues,
    S extends FieldPath<T> = FieldPath<T>,
>({
    name,
    label,
    formControlProps,
    defaultValue,
    closable,
    disabled,
    children,
    className,
    size,
    noDirtyCheck = false,
    ...props
}: SelectInputProps &
    UseControllerProps<T, S> & {
        noDirtyCheck?: boolean;
    }) {
    const {
        field: { value, onChange: handleChange },
        fieldState: { error },
    } = useController({ name, defaultValue });
    const {
        formState: { defaultValues },
    } = useFormContext();
    const inputId = `${name}-input`;
    const { t } = useTranslation();

    const isDirty = props.multiple
        ? !areArraysEqual(value, get(defaultValues, name))
        : get(defaultValues, name) !== value;

    const sx = useMemo(
        () => ({
            ...props.sx,
            '.MuiInputBase-root': {
                backgroundColor:
                    !noDirtyCheck && isDirty ? 'form.isDirty.main' : undefined,
            },
        }),
        [isDirty, props.sx, noDirtyCheck]
    );

    return (
        <FormControl
            sx={sx}
            error={!!error}
            fullWidth
            size={size}
            className={className}
            disabled={disabled}
            {...formControlProps}
        >
            <InputLabel id={`${inputId}-label`}>{label}</InputLabel>
            <Select
                labelId={`${inputId}-label`}
                value={value}
                label={label}
                onChange={handleChange}
                input={
                    <OutlinedInput
                        label={label}
                        endAdornment={
                            !disabled && closable && !isEmpty(value) ? (
                                <InputAdornment position="start">
                                    <IconButton
                                        title={t('Remove')}
                                        className="mr-0.5"
                                        size={size || 'small'}
                                        onClick={() =>
                                            handleChange(
                                                props.multiple ? [] : ''
                                            )
                                        }
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </InputAdornment>
                            ) : undefined
                        }
                    />
                }
                {...props}
            >
                {children}
            </Select>
            <When condition={error?.message}>
                <FormHelperText>{error?.message}</FormHelperText>
            </When>
        </FormControl>
    );
}

export default memo(SelectInput) as typeof SelectInput;
