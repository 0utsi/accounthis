'use client';

import {
    enUS as pickersEnUS,
    plPL as pickersPlPL,
} from '@mui/x-date-pickers/locales';
import {
    enUS as dataGridEnUS,
    plPL as dataGridPlPL,
} from '@mui/x-data-grid/locales';
import { createTheme, ThemeProvider as Provider } from '@mui/material/styles';
import ThemeModeContextDefault from '../constants/context/theme-mode-context';
import { enUS as coreEnUS, plPL as corePlPL } from '@mui/material/locale';
import { ReactNode, useEffect, useMemo } from 'react';
import ThemeMode from '../constants/enums/theme-mode';
import { red, yellow } from '@mui/material/colors';
import Language from '../constants/enums/language';
import useGetLocale from '../hooks/use-get-locale';
import { useLocalStorage } from 'react-use';
import { Roboto } from 'next/font/google';

interface ProviderProps {
    readonly children: ReactNode;
}

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const locales = {
    [Language.Pl]: [pickersPlPL, dataGridPlPL, corePlPL],
    [Language.En]: [pickersEnUS, dataGridEnUS, coreEnUS],
} as const;

function ThemeProvider({ children }: ProviderProps) {
    const [mode, setMode] = useLocalStorage<ThemeMode>(
        'themeMode',
        ThemeMode.Light
    );
    const locale = useGetLocale();

    useEffect(() => {
        const htmlElement = document.documentElement;

        if (mode === ThemeMode.Dark) {
            htmlElement.style.colorScheme = 'dark';
        } else {
            htmlElement.style.colorScheme = 'light';
        }
    }, [mode]);

    const theme = useMemo(
        () =>
            createTheme(
                {
                    typography: {
                        fontFamily: roboto.style.fontFamily,
                        button: {},
                    },
                    breakpoints: {
                        values: {
                            xs: 400,
                            sm: 640,
                            md: 900,
                            lg: 1024,
                            xl: 1536,
                        },
                    },
                    palette: {
                        mode,
                        primary: {
                            main: '#0F4C5C',
                            100: '#9A031E',
                            200: '#5F0F40',
                        },
                        secondary: {
                            main: '#E36414',
                            100: '#FB8B24'
                        },
                        
                        form: {
                            isDirty: {
                                main:
                                    mode === ThemeMode.Light
                                        ? yellow[50]
                                        : yellow[700],
                                hover:
                                    mode === ThemeMode.Light
                                        ? yellow[100]
                                        : yellow[800],
                            },
                            isError: {
                                main:
                                    mode === ThemeMode.Light
                                        ? red[50]
                                        : red[700],
                                hover:
                                    mode === ThemeMode.Light
                                        ? red[100]
                                        : red[800],
                            },
                        },
                        layoutBackground: {
                            default:
                                mode === ThemeMode.Light
                                    ? '#F7F9FB'
                                    : '#121212f4',
                            topBar:
                                mode === ThemeMode.Light ? '#fff' : '#121212',
                        },
                    },
                    components: {
                        MuiTypography: {
                            defaultProps: {
                                color: 'text.primary',
                            },
                        },
                        MuiCheckbox: {
                            styleOverrides: {
                                root: ({ theme: { palette } }) => ({
                                    color: palette.primary.main,
                                }),
                            },
                        },
                        MuiButton: {
                            styleOverrides: {
                                text: {
                                    textTransform: 'none',
                                },
                            },
                            defaultProps: {
                                size: 'small',
                            },
                        },
                        MuiDivider: {
                            styleOverrides: {
                                root: {
                                    background: '#fff',
                                },
                            },
                        },
                        MuiTooltip: {
                            defaultProps: {
                                arrow: true,
                                placement: 'top',
                            },
                        },
                        MuiAccordionSummary: {
                            styleOverrides: {
                                root: {
                                    '&&&': {
                                        cursor: 'default',
                                        minHeight: '64px',
                                    },
                                    '& .MuiAccordionSummary-content': {
                                        margin: '16px 0px',
                                    },
                                    '&&& .MuiAccordionSummary-content.Mui-expanded':
                                        {
                                            margin: '16px 0px',
                                        },
                                },
                            },
                        },
                        MuiTextField: {
                            defaultProps: {
                                size: 'small',
                                InputLabelProps: {
                                    shrink: true,
                                },
                            },
                        },
                        MuiAccordion: {
                            styleOverrides: {
                                root: ({ theme: { palette } }) => ({
                                    marginBottom: 0,
                                    borderRadius: '6px',
                                    borderColor: '#c7c7c7',
                                    boxShadow: 'none',
                                    borderWidth: '1px',

                                    '&.Mui-expanded': {
                                        borderColor: palette.primary.main,
                                    },

                                    '& .MuiAccordion-root': {
                                        borderWidth: '2px',
                                    },

                                    '&::before': {
                                        display: 'none',
                                    },
                                }),
                            },
                        },
                        MuiFormControl: {
                            defaultProps: {
                                size: 'small',
                            },
                            styleOverrides: {
                                root: {
                                    '& legend': {
                                        maxWidth: '100%',
                                    },
                                },
                            },
                        },
                        MuiInputLabel: {
                            defaultProps: {
                                shrink: true,
                            },
                        },
                        MuiDialog: {
                            defaultProps: {
                                fullWidth: true,
                                maxWidth: 'md',
                            },
                        },
                        MuiDialogContent: {
                            styleOverrides: {
                                root: {
                                    paddingTop: 0,
                                },
                            },
                        },
                        MuiDialogActions: {
                            styleOverrides: {
                                root: {
                                    paddingTop: 0,
                                },
                            },
                        },
                    },
                },
                locales[locale][0],
                locales[locale][1],
                locales[locale][2]
            ),
        [locale, mode]
    );

    const value = useMemo(() => ({ mode, setMode }), [mode, setMode]);

    return (
        <ThemeModeContextDefault.Provider value={value}>
            <Provider theme={theme}>{children}</Provider>
        </ThemeModeContextDefault.Provider>
    );
}
export default ThemeProvider;
