'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from './text-input';
import { useTranslation } from 'react-i18next';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useAuth } from '../context/auth-provider';
import * as yup from 'yup';
import CheckboxInput from './check-box';

interface FormInput {
    email: string;
    password: string;
    rememberPassword?: boolean;
}

function LoginForm() {
    const { login } = useAuth();
    const { t } = useTranslation();
    const methods = useForm<FormInput>({
        defaultValues: {
            email: '',
            password: '',
            rememberPassword: false,
        },
        resolver: yupResolver(
            yup.object().shape({
                email: yup
                    .string()
                    .email(t('Invalid email address format'))
                    .required(t('Please enter the email address')),
                password: yup.string().required(t('Please enter the password')),
                rememberPassword: yup.boolean(),
            })
        ),
    });

    const onSubmit: SubmitHandler<FormInput> = async (data) => {
        await login(data.email, data.password);
    };

    return (
		<Box className="flex flex-col items-center justify-center min-h-screen">
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <TextInput<FormInput>
                        name="email"
                        label={t('Email address')}
                        autoComplete="email"
                        noDirtyCheck
                    />
                    <TextInput<FormInput>
                        name="password"
                        label={t('Password')}
                        type="password"
                        autoComplete="current-password"
                        noDirtyCheck
                    />
                    <CheckboxInput<FormInput>
                        name="rememberPassword"
                        label={t('Remember password')}
                        className="pl-1"
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        size="large"
                        className="text-lg font-medium tracking-wider"
                    >
                        {t('Login')}
                    </Button>
                </Stack>
            </form>
        </FormProvider>
		</Box>
    );
}

export default LoginForm;
