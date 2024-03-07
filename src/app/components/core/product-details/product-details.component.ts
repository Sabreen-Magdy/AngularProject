import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/Models/iproduct';
import { FakeApiProductsService } from 'src/app/services/fake-api-products.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit,OnDestroy {
   product:IProduct | undefined={
    id:1,
    image:"https://images.pexels.com/photos/15928603/pexels-photo-15928603/free-photo-of-red-subaru-forester-on-dirt-road.jpeg?auto=compress&cs=tinysrgb&w=600",
    name:"Car",
    description:"Car red",
    price:20000,
    onSale:true,
    discount:5,
    quantity:1
}
   mySubscription:Subscription|undefined;
   id:number=1;
   constructor(private activeRoute:ActivatedRoute , private productservice:FakeApiProductsService){}
   ngOnDestroy(): void {
    this.mySubscription?.unsubscribe();
 }
   ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    this.mySubscription=this.productservice.getById(this.id).subscribe({
      next: (data:IProduct[]) => {
        this.product=data[0];
      },
      error: (error) => {
        this.product=undefined;
      }
    });
  }
  }

