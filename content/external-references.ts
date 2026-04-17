/**
 * Авторитетные внешние ссылки для статей (RU + международные).
 * ИИ: при смене URL проверяйте актуальность; предпочтение официальным ВОЗ, FAO, EFSA, gov, PMC.
 */
export type ExternalRef = {
  href: string;
  label: string;
  /** Подпись языка/региона для читателя. */
  localeNote: string;
};

/** ИМТ: классификация и здоровый вес. */
export const whoBmiRu: ExternalRef = {
  href: "https://www.who.int/ru/news-room/fact-sheets/detail/a-healthy-lifestyle---body-mass-index-(bmi)",
  label: "ВОЗ — здоровый образ жизни и ИМТ",
  localeNote: "официально, RU",
};

export const whoOverweightEn: ExternalRef = {
  href: "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight",
  label: "ВОЗ — избыточный вес и ожирение (обзор)",
  localeNote: "официально, EN",
};

export const whoOverweightRu: ExternalRef = {
  href: "https://www.who.int/ru/news-room/fact-sheets/detail/obesity-and-overweight",
  label: "ВОЗ — избыточный вес и ожирение (обзор)",
  localeNote: "официально, RU",
};

/** Энергозатраты, PAL, суточная потребность — методология FAO/WHO/UNU. */
export const faoWhoUnuHumanEnergy2004: ExternalRef = {
  href: "https://www.fao.org/3/y5546e/y5546e00.htm",
  label: "FAO/WHO/UNU — Human energy requirements (2004)",
  localeNote: "EN, PDF/веб",
};

/** Справочные значения потребления воды (Европейский орган безопасности продуктов). */
export const efsaWaterDrv2010: ExternalRef = {
  href: "https://www.efsa.europa.eu/en/efsajournal/pub/water-consumption",
  label: "EFSA — dietary reference values for water (2010)",
  localeNote: "EN, EU",
};

export const whoDrinkingWaterEn: ExternalRef = {
  href: "https://www.who.int/news-room/fact-sheets/detail/drinking-water",
  label: "ВОЗ — питьевая вода и здоровье",
  localeNote: "EN",
};

/** Оригинальная публикация уравнения Миффлина — Сан Жеора. */
export const mifflinOriginalDoi: ExternalRef = {
  href: "https://doi.org/10.1016/0002-8223(90)92272-O",
  label: "Mifflin et al., J Am Diet Assoc. — оригинальное уравнение (1990)",
  localeNote: "EN, DOI",
};

/** Сравнение точности уравнений BMR у современных взрослых. */
export const frankenfieldMifflinDoi: ExternalRef = {
  href: "https://doi.org/10.1016/j.jada.2005.02.007",
  label: "Frankenfield et al. — сравнение уравнений BMR (2005)",
  localeNote: "EN, DOI",
};

/** Модель энергетического баланса и масса тела (научное обоснование «правила 7 700 ккал» как приближения). */
export const hallEnergyBalancePmc: ExternalRef = {
  href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3630617/",
  label: "Hall et al. — энергетический баланс и масса тела (2011, обзор в PMC)",
  localeNote: "EN, NIH/PMC",
};

/** Популярное разъяснение для пациентов (не замена гайдлайнам ВОЗ). */
export const nhsCaloriesOverview: ExternalRef = {
  href: "https://www.nhs.uk/live-well/healthy-weight/why-we-put-on-weight/",
  label: "NHS (UK) — калории, вес и энергия (разъяснение для широкой аудитории)",
  localeNote: "EN, UK",
};

/** Русскоязычный обзор ВОЗ по здоровому питанию (контекст к калориям и рациону). */
export const whoHealthyDietRu: ExternalRef = {
  href: "https://www.who.int/ru/news-room/fact-sheets/detail/healthy-diet",
  label: "ВОЗ — здоровое питание",
  localeNote: "официально, RU",
};

/** База состава продуктов (для сверки с этикеткой и порций). */
export const usdaFoodDataCentral: ExternalRef = {
  href: "https://fdc.nal.usda.gov/",
  label: "USDA FoodData Central — база состава продуктов",
  localeNote: "EN, открытый поиск",
};
