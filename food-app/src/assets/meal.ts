class Meal {
  name!: string;
  category!: string;
  description: string;
  time: number;
  rating: number;
  url!: string;
  images?: string[] = [];

  constructor(description: string = '', time: number = 0, rating: number = 0) {
    this.description = description;
    this.time = time;
    this.rating = rating;
  }
}

const MEALCATEGORIES = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  dessert: 'Dessert',
};

export { Meal, MEALCATEGORIES };
