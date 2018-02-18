import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient} from "@angular/common/http";
import { ProductProvider} from "../../providers/product/product";
import {Detail} from "../../detail";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public allProducts: Detail[];
  constructor( private provider: ProductProvider,private http: HttpClient, public navCtrl: NavController) {

  }
  ionViewDidLoad():void
  {
    this.provider.getProducts()
      .subscribe(allProducts=> this.allProducts = allProducts);
  }
}
