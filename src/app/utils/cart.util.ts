import { environment } from 'src/environments/environment';
import { Cart } from './../models/cart.model';
import { CartItem } from '../models/cart-item.model';

export class CartUtils {
  public static get(): Cart {
    const data = localStorage.getItem(environment.keys.cartKey);
    return data ? JSON.parse(data) : new Cart();
  }

  public static set(cart: Cart): void {
    localStorage.setItem(environment.keys.cartKey, JSON.stringify(cart));
  }

  public static addItem(
    id: string,
    product: string,
    quantity: number,
    price: number,
    image: string
  ): void {
    let cart = this.get();

    let itemIndex = cart.items.findIndex(i => i.id === id);
    if (itemIndex != -1) {
      cart.items[itemIndex].quantity = cart.items[itemIndex].quantity + 1;
    } else {
      cart.items.push(new CartItem(id, product, quantity, price, image));
    }

    this.set(cart);
  }

  public static removeItem(item: CartItem): void {
    let cart = this.get();
    let index = cart.items.findIndex(i => i.id === item.id);
    cart.items.splice(index, 1);
    this.set(cart);
  }

  public static clear(): void {
    localStorage.removeItem(environment.keys.cartKey);
  }
}
