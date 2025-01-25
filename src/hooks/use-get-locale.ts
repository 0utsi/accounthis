import Language from '../constants/enums/language';
import { useTranslation } from 'react-i18next';

function useGetLocale() {
	const { i18n } = useTranslation();

	return i18n.language as Language;
}

export default useGetLocale;
