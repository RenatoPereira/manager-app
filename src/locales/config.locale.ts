export type Locale = (typeof locales)[number];
export const locales = ["en", "pt-br"];
export const defaultLocale: Locale = locales[0];
