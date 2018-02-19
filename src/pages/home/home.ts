import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { HttpClient} from "@angular/common/http";
import { ProductProvider} from "../../providers/product/product";
import { Detail} from "../../detail";
import { ProductDetailPage} from "../product-detail/product-detail";
import { FilterModalPage} from "../filter-modal/filter-modal";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  allProducts: Detail[];
  private femaleSelected = true;
  private maleSelected = true;
  constructor(private modalController:ModalController, private provider: ProductProvider,private http: HttpClient, public navCtrl: NavController) {

  }
  openFilterModal(){
    let filterStateFromMainPage={
      maleSelected: this.maleSelected,
      femaleSelected: this.femaleSelected
    }
    let openFilterModal = this.modalController.create(FilterModalPage,filterStateFromMainPage);

    openFilterModal.onDidDismiss((filterState)=>{
      this.femaleSelected = filterState.femaleSelected,
        this.maleSelected = filterState.maleSelected,
      this.provider.getProducts()
        .subscribe(data => {
          if(filterState.maleSelected&&filterState.femaleSelected){
            this.allProducts = data;
            return;

          }else if(filterState.maleSelected&&!filterState.femaleSelected){
            this.allProducts = data.filter(product=>product.gender !== "female");
            return;
          }else if(!filterState.maleSelected&&filterState.femaleSelected){
            this.allProducts = data.filter(product=>product.gender !== "male");
            return;
          }else{
            this.allProducts = null;
            return;
          }
        }),
      console.log(filterState)
    })
    openFilterModal.present();
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
