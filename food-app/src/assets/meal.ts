class MealType {
  name!: string;
  keywords!: string[];
}

const MEALTYPES: MealType[] = [
  {
    name: 'Breakfast',
    keywords: ['breakfast', 'brunch'],
  },
  {
    name: 'Lunch',
    keywords: ['lunch', 'main', 'main course', 'main dish', 'World Cuisine'],
  },
  {
    name: 'Dinner',
    keywords: ['dinner', 'main', 'main course', 'main dish', 'World Cuisine'],
  },
  {
    name: 'Desserts & Snacks',
    keywords: ['dessert', 'snack', 'appetizer', 'antipasto', 'fingerfood'],
  },
  {
    name: 'Side Dish',
    keywords: ['side dish', 'salad', 'soup'],
  },
];

export { MealType, MEALTYPES };
