import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactsComponent } from './../contacts/contacts.component';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm:FormGroup=new FormGroup({
    name:new FormControl('',[
      Validators.required,
      Validators.minLength(5)
    ]),
    id:new FormControl(0,[
      Validators.required
    ]),
    image:new FormControl('',[
      Validators.required
    ]),
    description:new FormControl('',[
      Validators.required,
      Validators.minLength(5)
    ]),
    price:new FormControl(0,[
      Validators.required,
      Validators.min(100)
    ]),
    quantity:new FormControl(0,[
      Validators.required,
    ]),
    discount:new FormControl(0,[
      Validators.required,
      Validators.min(5),
      Validators.max(25)
    ]),
    onSale:new FormControl(false)
   });
     get productNameControl(){
      return this.productForm.get('name');
      }
      get productIdControl(){
        return this.productForm.get('id');
    }
    get productDescriptionControl(){
      return this.productForm.get('description');
    }
    get productImageControl(){
      return this.productForm.get('image');
    }
    get productPriceControl(){
      return this.productForm.get('price');
    }
    get productQuantityControl(){
      return this.productForm.get('quantity');
    }
    get productDiscountControl(){
      return this.productForm.get('discount');
    }
    constructor(private productService :ProductService , private myRouter :Router , private actroute:ActivatedRoute){}
    id:number=0;
    ngOnInit(): void {
      this.id=this.actroute.snapshot.params['id'];
      if(this.id != 0){
        var product:IProduct=this.productService.getById(this.id) as IProduct;
        this.productForm.controls['id'].setValue(product.id);
        this.productForm.controls['name'].setValue(product.name);
        this.productForm.controls['image'].setValue(product.image);
        this.productForm.controls['description'].setValue(product.description);
        this.productForm.controls['price'].setValue(product.price);
        this.productForm.controls['quantity'].setValue(product.quantity);
        this.productForm.controls['discount'].setValue(product.discount);
        this.productForm.controls['onSale'].setValue(product.onSale);
      }
    }
    sendValues(e: Event): void {
      e.preventDefault();
       if (this.productForm.valid) {
        let p=this.productForm.value;
        let product:IProduct=this.productService.getById(p.id) as IProduct;
        if(product){
          this.productService.edit(p);
        }else{
          this.productService.add(p);
        }
        this.productForm.reset();
        this.myRouter.navigate(['/products'])
      }
    }
}
