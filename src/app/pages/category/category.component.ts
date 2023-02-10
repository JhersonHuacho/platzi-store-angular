import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  products: Product[] = [];
  categoryId: string | null = null;
  limit = 10;
  offset = 0;

  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit(): void {
    // callback hell
    // this.activatedRoute.paramMap.subscribe(params => {
    //   this.categoryId = params.get('id');

    //   if (this.categoryId) {
    //     this.productsService.getByCategory(this.categoryId, this.limit, this.offset)
    //       .subscribe(data => {
    //         console.log("data",data);
    //         this.products = data;
    //       });
    //   }
    //   console.log(this.categoryId);
    // });

    this.activatedRoute.paramMap
      .pipe(
        switchMap(params => {
          this.categoryId = params.get('id');
          if (this.categoryId) {
            return this.productsService.getByCategory(this.categoryId, this.limit, this.offset);
          }
          return [];
        })
      )
      .subscribe(data => {
        console.log("data",data);
        this.products = data;
      });
  };
}
