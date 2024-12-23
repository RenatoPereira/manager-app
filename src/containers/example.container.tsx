import { ExampleComponent } from "@/components/example.component";
import { useTranslations } from "next-intl";

export const ExampleContainer = () => {
  const t = useTranslations("HomePage");
  return (
    <div className="flex flex-col gap-y-10 items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold">{t("title")}</h1>

      <ExampleComponent />
    </div>
  );
};

