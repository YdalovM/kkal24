/**
 * Справочник продуктов для ориентиров порций калькулятора питания.
 * Ккал/100 г — из `content/food-calorie-reference.ts` (таблица на странице калькулятора питания);
 * для позиций вне таблицы — ориентиры в духе той же методики (см. комментарии у `def`).
 *
 * ИИ: новый продукт — добавить id в union `MealPlanProductId`, строку в `def(...)`,
 * и id в `ALL_MEAL_PLAN_PRODUCT_IDS` (для URL и дефолтных prefs). Логику подбора
 * текста порций править в `lib/meal-plan-suggestions.ts`.
 */

export type MealPlanProductId =
  | "carb_rice"
  | "carb_pasta"
  | "carb_buckwheat"
  | "carb_potato"
  | "carb_baked_potato"
  | "carb_pearl"
  | "carb_oatmeal"
  | "carb_millet"
  | "carb_bulgur"
  | "carb_couscous"
  | "carb_quinoa"
  | "carb_lentil"
  | "carb_beans"
  | "carb_bread"
  | "carb_rye_bread"
  | "prot_chicken"
  | "prot_fish"
  | "prot_cottage"
  | "prot_egg"
  | "prot_turkey"
  | "prot_beef"
  | "prot_thigh"
  | "prot_pork"
  | "prot_salmon"
  | "prot_tuna"
  | "prot_yogurt"
  | "prot_kefir"
  | "fruit_apple"
  | "fruit_banana"
  | "fruit_orange"
  | "fruit_berry"
  | "fruit_grape"
  | "fruit_kiwi"
  | "fruit_pear"
  | "extra_veg"
  | "extra_fruit";

export type MealPlanProductDef = {
  id: MealPlanProductId;
  /** Подпись в настройках (именительный падеж). */
  label: string;
  /** Фраза в ориентире порции (родительный / как в таблице). */
  portionName: string;
  kcal100: number;
};

function def(
  id: MealPlanProductId,
  label: string,
  portionName: string,
  kcal100: number,
): MealPlanProductDef {
  return { id, label, portionName, kcal100 };
}

export const MEAL_PLAN_CARBS: readonly MealPlanProductDef[] = [
  def("carb_rice", "Рис отварной", "риса отварного", 130),
  def("carb_pasta", "Макароны отварные", "макарон отварных", 131),
  def("carb_buckwheat", "Гречка отварная", "гречки отварной", 101),
  def("carb_potato", "Картофель отварной", "картофеля отварного", 82),
  def("carb_baked_potato", "Картофель печёный", "картофеля печёного", 93),
  def("carb_pearl", "Перловка отварная", "перловки отварной", 109),
  def("carb_oatmeal", "Овсяная каша на воде", "овсяной каши на воде", 88),
  def("carb_millet", "Пшённая каша", "пшённой каши", 90),
  def("carb_bulgur", "Булгур отварной", "булгура отварного", 83),
  def("carb_couscous", "Кус-кус отварной", "кус-куса отварного", 112),
  def("carb_quinoa", "Киноа отварная", "киноа отварной", 120),
  def("carb_lentil", "Чечевица отварная", "чечевицы отварной", 116),
  /** Усреднение по красной/белой фасоли готовой; точнее — по этикетке. */
  def("carb_beans", "Фасоль отварная", "фасоли отварной", 102),
  def(
    "carb_bread",
    "Хлеб пшеничный",
    "хлеба пшеничного (ориентир)",
    265,
  ),
  def("carb_rye_bread", "Хлеб ржаной", "хлеба ржаного (ориентир)", 214),
];

export const MEAL_PLAN_PROTEINS: readonly MealPlanProductDef[] = [
  def("prot_chicken", "Куриная грудка", "куриной грудки запечённой", 165),
  def("prot_thigh", "Куриное бедро, запечённое", "куриного бедра запечённого", 185),
  /** Усреднение между белой рыбой и лососем; точнее смотреть по сорту и жирности. */
  def("prot_fish", "Рыба запечённая", "рыбы запечённой (ориентир)", 118),
  def("prot_salmon", "Лосось / форель, запечённые", "лосося или форели запечённой", 140),
  def("prot_cottage", "Творог 5%", "творога 5%", 121),
  def("prot_egg", "Яйца", "яйца (как целых)", 157),
  def("prot_turkey", "Индейка, филе", "индейки (филе)", 160),
  def("prot_beef", "Говядина постная, тушёная", "говядины постной тушёной", 180),
  def("prot_pork", "Свинина постная, запечённая", "свинины постной запечённой", 210),
  def("prot_tuna", "Тунец в собственном соку", "тунца консервированного", 116),
  def("prot_yogurt", "Йогурт натуральный", "йогурта натурального", 60),
  def("prot_kefir", "Кефир 2,5%", "кефира 2,5%", 53),
];

/** Фрукты для лёгкого перекуса (малый приём). */
export const MEAL_PLAN_SNACK_FRUITS: readonly MealPlanProductDef[] = [
  def("fruit_apple", "Яблоко", "яблока", 52),
  def("fruit_banana", "Банан", "банана", 89),
  def("fruit_orange", "Апельсин", "апельсина", 43),
  def("fruit_berry", "Ягоды (клубника)", "ягод (ориентир)", 32),
  def("fruit_grape", "Виноград", "винограда", 69),
  def("fruit_kiwi", "Киви", "киви", 61),
  def("fruit_pear", "Груша", "груши", 43),
];

/** Ккал/100 г как у капусты в справочнике; для помидор/огурца вес порции при той же ккал будет больше. */
export const MEAL_PLAN_EXTRA_VEG: MealPlanProductDef = def(
  "extra_veg",
  "Овощи (салат, помидор)",
  "овощей (капуста, помидор)",
  27,
);

export const MEAL_PLAN_EXTRA_FRUIT: MealPlanProductDef = def(
  "extra_fruit",
  "Фрукт или ягоды (к большому приёму)",
  "фрукта или ягод",
  52,
);

export const ALL_MEAL_PLAN_PRODUCT_IDS: readonly MealPlanProductId[] = [
  ...MEAL_PLAN_CARBS.map((x) => x.id),
  ...MEAL_PLAN_PROTEINS.map((x) => x.id),
  ...MEAL_PLAN_SNACK_FRUITS.map((x) => x.id),
  MEAL_PLAN_EXTRA_VEG.id,
  MEAL_PLAN_EXTRA_FRUIT.id,
];

/** Все продукты одним массивом — поиск и чипы в UI калькулятора питания. */
export function allMealPlanProductDefs(): readonly MealPlanProductDef[] {
  return [
    ...MEAL_PLAN_CARBS,
    ...MEAL_PLAN_PROTEINS,
    ...MEAL_PLAN_SNACK_FRUITS,
    MEAL_PLAN_EXTRA_VEG,
    MEAL_PLAN_EXTRA_FRUIT,
  ];
}

export function mealPlanProductDefById(
  id: MealPlanProductId,
): MealPlanProductDef | undefined {
  return allMealPlanProductDefs().find((p) => p.id === id);
}
