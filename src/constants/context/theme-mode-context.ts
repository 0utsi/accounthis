import { createContext, Dispatch, SetStateAction } from 'react';
import ThemeMode from '../enums/theme-mode';

export interface ThemeModeContext {
	mode: ThemeMode | undefined;
	setMode: Dispatch<SetStateAction<ThemeMode | undefined>>;
}

export default createContext<ThemeModeContext | null>(null);
