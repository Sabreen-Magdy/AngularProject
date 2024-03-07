import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FakeApiProductsService } from 'src/app/services/fake-api-products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit,OnDestroy {
  productForm:FormGroup=new FormGroup({
    name:new FormControl('',[
      Validators.required,
      Validators.minLength(5)
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
    constructor(private productService :FakeApiProductsService , private myRouter :Router , private actroute:ActivatedRoute){}
  ngOnDestroy(): void {
    this.mysubGet?.unsubscribe();
    this.mysubAction?.unsubscribe();
  }
    id:number=0;
    mysubGet:Subscription|undefined;
    mysubAction:Subscription|undefined;

    ngOnInit(): void {
      this.id=this.actroute.snapshot.params['id'];
      if(this.id != 0){
        this.mysubGet= this.productService.getById(this.id).subscribe((data)=>{
          this.productForm.controls['name'].setValue(data[0].name);
          this.productForm.controls['image'].setValue(data[0].image);
          this.productForm.controls['description'].setValue(data[0].description);
          this.productForm.controls['price'].setValue(data[0].price);
          this.productForm.controls['quantity'].setValue(data[0].quantity);
          this.productForm.controls['discount'].setValue(data[0].discount);
          this.productForm.controls['onSale'].setValue(data[0].onSale);
         })
      }
    }
    sendValues(e: Event): void {
      e.preventDefault();
       if (this.productForm.valid) {
          if(this.id){
            this.mysubAction = this.productService.edit(this.id,this.productForm.value).subscribe();
          }else{
            this.mysubAction = this.productService.add(this.productForm.value).subscribe();
          }
        };
        this.productForm.reset();
        this.myRouter.navigate(['/products'])
      }
    }

