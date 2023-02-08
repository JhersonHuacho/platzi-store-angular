import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { Product, CreateProductDTO, UpdateProductDTO } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  today = new Date();
  date = new Date(2021, 1, 21);
  showProductDetail = false;
  productChosen: Product = <Product>{};
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(private storeService: StoreService, private productsService: ProductsService) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    // this.productsService.getAllProducts().subscribe(data => {
    //   console.log(data);
    //   this.products = data;
    // });
    this.productsService.getProductsByPage(10, 0).subscribe(data => {
      this.products = data;
      this.offset += this.limit;
    });
  }

  onAddToShoppingCart(product: Product) {
    console.log(product);
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  onShowDetailProduct(id: string) {
    console.log(id);
    this.statusDetail = 'loading';
    this.toggleProductDetail();

    this.productsService.getProduct(id).subscribe(data => {
      this.productChosen = data;
      this.statusDetail = 'success';
    //}, response => {
    }, errorMessage => {
      this.statusDetail = 'error';
      window.alert(errorMessage);
      //console.log('response onShowDetailProduct',response);
      //console.log('response onShowDetailProduct',response.error);
      //console.log('response onShowDetailProduct',response.error.message);
    });
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }
  // callback hell
  readAndUpdateCallbackHell(id: string) {
    this.productsService.getProduct(id)
      .subscribe(data => {
        const product = data;
        this.productsService.update(product.id, { title: 'change' })
          .subscribe(rtaUpdate => {
            console.log(rtaUpdate);
          });
      })
  }

  // Evitando el callback hell
  readAndUpdate(id: string) {
    this.productsService.getProduct(id)
      .pipe(
        switchMap((product) => {
          return this.productsService.update(product.id, { title: 'change' });
        }),
        switchMap((product) => {
          return this.productsService.update(product.id, { title: 'change' });
        })
      )
      .subscribe(data => {
        console.log(data);
      });

    zip(
      this.productsService.getProduct(id),
      this.productsService.update(id, { title: 'nuevo' })
    ).subscribe(response => {
      const product = response[0];
      const update = response[1];
    })

    this.productsService.fetchReadAndUpdate(id, { title: 'nuevo' }).subscribe(response => {
      console.log(response);
      const product = response[0];
      const update = response[1];
    })
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'description',
      images: ['https://placeimg.com/640/480/any'],
      price: 100,
      categoryId: 2
    }
    this.productsService.create(product).subscribe(data => {
      console.log('created',data);
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'nuevo title'
    }
    const id = this.productChosen.id;
    this.productsService.update(id, changes).subscribe(data => {
      console.log(data);
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  loadMore() {
    this.productsService.getProductsByPage(this.limit, this.offset).subscribe(data => {
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }
}
