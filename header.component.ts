
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/cart.service';
import { Cart } from 'src/app/core/models/cart-model';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogedIn!:string|null;
  user!:string|null;
  cartItem!:Cart[];

  //totalcartproduct
  //cartitem
  constructor(private userService: UserService, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.isLogedIn = this.userService.isLogedIn();
    this.user = localStorage.getItem('name');

    this.cartService.getProductsFromCart().subscribe(
      (data:any) => {
        this.cartItem = data;
        console.log("cart_data", this.cartItem)
      },
      (error) => {console.log('error', error)}
    );

    this.cartService.cartDataFromProduct.subscribe(
      (data: any) => {
        this.cartItem = data
      }
    )

    this.userService.loggedInData.subscribe(
      (data: any) => { this.isLogedIn = data; }
    )
  }


  logout(){
    this.userService.logout();
    this.router.navigate(['login'])
  }

}
