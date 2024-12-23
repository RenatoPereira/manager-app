"use client";

import { locales, Locale } from "@/locales/config.locale";
import { setUserLocale } from "@/locales/database.locale";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

export const ExampleComponent = () => {
  const t = useTranslations("Translation");
  const [isPending, startTransition] = useTransition();

  function onChange(value: Locale) {
    const locale = value;

    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
      {isPending ? (
        <p>Loading...</p>
      ) : (
        locales.map((locale) => (
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            name="locale"
            key={locale}
            onClick={() => onChange(locale)}
          >
            {t(locale)}
          </button>
        ))
      )}
    </div>
  );
};

