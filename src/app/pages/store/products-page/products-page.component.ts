import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';

import { DataService } from './../../../services/data.service';
import { Product } from 'src/app/models/product.model';
import { map, filter, debounceTime, distinctUntilChanged, tap, switchMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html'
})
export class ProductsPageComponent implements OnInit {
  public products$: Observable<Product[]> = null;
  public filteredProducts$: Observable<Product[]> = null;
  public queryField: FormControl = new FormControl();
  public queryField$: Observable<string>;

  constructor(private dataService: DataService) { };

  ngOnInit(): void {
    this.products$ = this.dataService.getProducts();
    this.queryField$ = this.queryField.valueChanges.pipe(startWith('')); //Inicia o observable com uma pesquisa em branco;

    this.filteredProducts$ = combineLatest(this.products$, this.queryField$).pipe(
      map(([products, filter]) =>
        products.filter(product => product.title.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1))
    );
  }
}
