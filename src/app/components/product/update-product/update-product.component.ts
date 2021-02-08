import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '../product-model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute

  ) { }



  product: ProductModel = {
    name: '',
    price: null,
    description: ''
  };

  product_id: string = ""

  ngOnInit(): void {
    const id_param = this.route.snapshot.paramMap.get('id');
    const id: string = id_param ? id_param.toString() : ""
    this.productService.readById(id)
      .subscribe(product => this.product = product);
  }

  updateProduct(): void {
    this.productService.update(this.product)
      .subscribe(() => {
        this.productService.showMessage('Product updated');
        this.router.navigate(['/products']);
      });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}

