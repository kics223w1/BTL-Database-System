// import { CartItem, Dish } from "../features/types";

// class CardState {
//   private items: CartItem[];

//   constructor() {
//     this.items = [];
//   }

//   public getItems() {
//     return this.items;
//   }

//   public addItem(dish: Dish) {
//     this.items = this.items.flatMap((item) => {
//       if (dish.dish_id === item.dish_id) {
//         return {
//           ...item,
//           quantity: item.quantity + 1,
//         };
//       }
//       return [item];
//     });

//     if (this.items.length === 0) {
//       this.items.push({
//         ...dish,
//         quantity: 1,
//       });
//     }
//   }

//   public removeItem(dishId: string) {
//     this.items = this.items.filter((cartItem) => cartItem.dish_id !== dishId);
//   }

//   public increaseItemQuantity(dishId: string) {
//     this.items = this.items.flatMap((item) => {
//       if (dishId === item.dish_id) {
//         return {
//           ...item,
//           quantity: item.quantity + 1,
//         };
//       }
//       return [item];
//     });
//   }

//   public decreaseItemQuantity(dishId: string) {
//     this.items = this.items.flatMap((item) => {
//       if (dishId === item.dish_id) {
//         return {
//           ...item,
//           quantity: item.quantity - 1,
//         };
//       }
//       return [item];
//     });
//   }
// }

// export default new CardState();
