import { UrlTree } from "@angular/router";

//data for post here
export class Item{
    constructor(
        public itemid: string,
        public vendor: string,
        public username: string,
        public img1: string,
        public img2: string,
        public img3: string,
        public title: string,
        public description: string,
        public price: string,
        public size: string,
        public color: string,
        public categories: string,
        public brand: string,
        public type: string
    ){}
}


//data for buy here
export class sold{
    constructor(
        public itemid: string,
        public customer: string,
        public username: string,
        public brand: string,
        public price: string,
        public img1: string,
    ){}
}