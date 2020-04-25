import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { DataService } from './../../../services/data.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html'
})
export class ProductsPageComponent implements OnInit {
  public products$: Observable<Product[]> = null;
  public form: FormGroup;

  _filteredProducts$: Observable<Product[]> = null;
  _filterBy: string;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      search: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(255)
      ])]
    });
  }

  ngOnInit(): void {
    this.products$ = this.dataService.getProducts();
  }

  // set searchProduct(value: string) {
  //   this._filterBy = this.form.get('search').value;
  //   this._filteredProducts$ = this.products$
  //     .pipe(
  //       map(products =>
  //         products.filter((product: Product) => product.title.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1)
  //       )
  //     )
  //   // this._filteredProducts = this.products$.filter((course: Course) => course.name.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);
  // }

  // get searchProduct() {
  //   return this._filterBy;
  // }
}
