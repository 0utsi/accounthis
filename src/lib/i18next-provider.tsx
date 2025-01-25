'use client';

import { initReactI18next, I18nextProvider as Provider } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { fallbackLng, supportedLngs } from '../constants/common';
import { ReactNode, useEffect, useState } from 'react';
import Language from '../constants/enums/language';
import i18n, { Resource } from 'i18next';
import includes from 'lodash/includes';
import { Maybe } from '../types/common';
import en from '../locales/en.json'
import pl from '../locales/pl.json'

interface ProviderProps {
    readonly children: ReactNode;
    lng: Maybe<string>;
}

const resources: Record<Language, Resource> = {
    en: {
        translation: en,
    },
    pl: {
        translation: pl,
    },
};

function I18nextProvider({ children, lng }: ProviderProps) {
    const [i18nInitialized, setI18nInitialized] = useState(false);

    useEffect(() => {
        if (!i18nInitialized) {
            i18n.use(initReactI18next)
                .use(LanguageDetector)
                .init({
                    lng: !includes(supportedLngs, lng)
                        ? fallbackLng
                        : (lng as Language),
                    resources,
                    keySeparator: false,
                    supportedLngs,
                    interpolation: {
                        escapeValue: false,
                    },
                    detection: {
                        order: ['cookie', 'localStorage', 'navigator'],
                        caches: ['cookie', 'localStorage'],
                    },
                    returnEmptyString: false,
                })
                .then(() => setI18nInitialized(true));
        }
    }, [lng, i18nInitialized]);

    if (!i18nInitialized) return null;

    return <Provider i18n={i18n}>{children}</Provider>;
}

export default I18nextProvider;
