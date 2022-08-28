import { UrlTree } from "@angular/router";

//data here
export class Item{
    constructor(
        public itemid: string,
        public vendor: string,
        public img1: string,
        public img2: string,
        public img3: string,
        public title: string,
        public description: string,
        public price: string,
        public brand: string,
        public type: string
    ){}
}