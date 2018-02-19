import { Component } from '@angular/core';
import { ProductProvider} from "../../providers/product/product";
import { NavController } from 'ionic-angular';
import {Detail} from "../../detail";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public bestSellerProducts: Detail[];
  constructor(private provider: ProductProvider,public navCtrl: NavController) {

  }
  ionViewDidLoad(){

    this.provider.getProducts()
      .subscribe(data=> this.bestSellerProducts=data.filter(product => product.bestSeller==true));
    console.log(this.bestSellerProducts)
  }

}

