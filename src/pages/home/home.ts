import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient} from "@angular/common/http";
import { ProductProvider} from "../../providers/product/product";
import { Detail} from "../../detail";
import {ProductDetailPage} from "../product-detail/product-detail";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  allProducts: Detail[];

  constructor( private provider: ProductProvider,private http: HttpClient, public navCtrl: NavController) {

  }
  goToProductDetailPage(product){
    this.navCtrl.push(ProductDetailPage,{
      productDetails: product
    });
  }
  ionViewDidLoad():void
  {
    this.provider.getProducts()
      .subscribe(data=> this.allProducts = data);
  }
}
