import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/cart.service';
import { Cart, CartProductDTO, CustomerCart, CustomerCartDTO, Product } from 'src/app/core/models/cart-model';
import { ProductDTO } from 'src/app/core/models/checkout-model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  errorMessage!:string;
  successMessage!:string;
  constructor(private router:Router, private cartService: CartService) { }
  @Input() product_data!:Product;
  ngOnInit(): void {
  }


  goToDesc(data:Product){
    console.log(data.productId)
    this.router.navigate(['product', data.productId])
  }


  addToCart(data:ProductDTO){
     /**
      * { 
      * customerEmailId
      * cartProducts:[
      *   product:{"productId": data.productID},
      *   quanity
      * ]
      * }
      */
    let customerEmail=localStorage.getItem('emailId');
    let quantity =1;
    let cardtProductDTO: CartProductDTO ={
      product:data, 
      quantity:1
    }
    if(customerEmail){
      let customerCart:CustomerCartDTO={
        cartId:1,
        customerEmailId:customerEmail,
        cartProducts:[ cardtProductDTO ]
      }
      this.cartService.addProductToCart(customerCart).subscribe(
        (data:any) => {this.successMessage=`Product of id ${data?.cartId}`},
        (error)=>{
          this.errorMessage=error?.message
          console.log("error",this.errorMessage)

          this.cartService.getProductsFromCart().subscribe(
            (data:any) => {
              this.cartService.setCartDataFromProduct(data)
            },
            (error) => {console.log('error', error)}
          );
        }
      )
    }else{
      this.errorMessage="Please Login To add Product"
    }
  }
}
