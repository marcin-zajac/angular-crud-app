import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../product-model';
import { ProductService } from '../product.service'

@Component({
  selector: 'app-read-product',
  templateUrl: './read-product.component.html',
  styleUrls: ['./read-product.component.scss']
})
export class ReadProductComponent implements OnInit {

  products: ProductModel[] = [];

  constructor(private productService: ProductService) { }

  read(): void {
    this.productService.read()
      .subscribe(products => {
        this.products = products;
      });
  }

  delete(product: ProductModel): void {
    this.productService.delete(product).subscribe(() => {
      this.ngOnInit()
    });
    this.productService.showMessage('Product deleted witch it campaigns');


  }

  ngOnInit(): void {
    this.read();
  }
}
