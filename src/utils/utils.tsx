import Strings from './strings';

export const translate = (text: any) => {
	if (!text) return "";

	if (typeof text === "string") return text;

	const lang = Strings.getLanguage();
	const defaultLanguage = Strings.getLanguage();

	if (text[defaultLanguage] || text[lang]) {
		return text[defaultLanguage] || text[lang];
	}

	return Object.values(text).filter((val) => !!val)[0] || "";
};

export const formatPrice = (price: number) => {
	if (!price) return '0.00€'
	return `${price.toFixed(2)} €`;
}

export const LANGUAGES = [
	{
		value: 'pt',
		label: 'PT',
	},
	{
		value: 'en',
		label: 'EN',
	},
];
