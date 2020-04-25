import { CartUtils } from '../../../utils/cart.util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cart } from 'src/app/models/cart.model';
import { CartItem } from 'src/app/models/cart-item.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent implements OnInit {

  public cart: Cart = new Cart();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cart = CartUtils.get();
  }

  total(): number {
    return this.cart.items.reduce((total, item) => total + (item.quantity * item.price), 0);
  }

  removeItem(item: CartItem): void {
    CartUtils.removeItem(item);
    this.loadCart();
  }

  clear(): void {
    CartUtils.clear();
    this.loadCart();
  }
}
