import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from '../product-model';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  product: ProductModel = {
    name: '',
    price: null,
    description: ''
  };

  ngOnInit(): void {
  }

  createProduct(): void {
    this.productService.create(this.product)
      .subscribe(() => {
        this.productService.showMessage('New product created');
        this.router.navigate(['/products']);
      });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
