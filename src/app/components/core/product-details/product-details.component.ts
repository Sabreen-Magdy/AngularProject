import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
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
   id:number=1;
   constructor(private activeRoute:ActivatedRoute , private productservice:ProductService){}
  ngOnInit(): void {
    this.id=this.activeRoute.snapshot.params['id'];
    this.product=this.productservice.getById(this.id);
  }
  }

