'use client';

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '../text-input';
import { useTranslation } from 'react-i18next';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useAuth } from '../../context/auth-provider';
import * as yup from 'yup';
import CheckboxInput from '../check-box';
import { useRouter } from 'next/navigation';

interface FormInput {
    email: string;
    password: string;
	passwordRepeat: string;
    rememberPassword?: boolean;
}

function RegisterForm() {
    const { login } = useAuth();
	const { push } = useRouter()
    const { t } = useTranslation();

    const methods = useForm<FormInput>({
        defaultValues: {
            email: '',
            password: '',
			passwordRepeat: '',
            rememberPassword: false,
        },
        resolver: yupResolver(
            yup.object().shape({
                email: yup
                    .string()
                    .email(t('Invalid email address format'))
                    .required(t('Please enter the email address')),
                password: yup.string().required(t('Please enter the password')),
                passwordRepeat: yup.string().required(t('Please repeat password')),
                rememberPassword: yup.boolean(),
            })
        ),
    });

    const onSubmit: SubmitHandler<FormInput> = async (data) => {
        await login(data.email, data.password);
    };

    return (
		<Box className="flex flex-col items-center justify-center min-h-screen">
			<Typography className="py-3 text-xl font-mono">{t('signUp')}</Typography>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} >
                <Stack spacing={2} className="w-[350px]">
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
                    <TextInput<FormInput>
                        name="passwordRepeat"
                        label={t('Password')}
                        type="password"
                        autoComplete="current-password"
                        noDirtyCheck
                    />
                    <CheckboxInput<FormInput>
                        name="rememberPassword"
                        label={t('Remember password')}
						className="p-0 scale-75  mt-0"
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        size="large"
                        className="text-lg font-medium tracking-wider"
                    >
                        {t('Login')}
                    </Button>
					<Button onClick={() => push('/auth/login')} variant='text'>{t('haveAcc')}</Button>
                </Stack>
            </form>
        </FormProvider>
		</Box>
    );
}

export default RegisterForm;
