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
        public quantity: string,
        public orgqty: string,
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


//for tracking item
export class Tracks{
    constructor(
        public trackid: string,
        public orderid: string,
        public eta: string,
        public payment: string,
        public totalprice: string,
        public status: string,
        public quantity: string,
        public address: string,
        public items: string
    ){}
}

//for report
export class report{
    constructor(
        public description: string,
        public error: string,
        public screenshot: string,
        public username: string
    ){}
}

//for donation
export class donation{
    constructor(
        public donateid: string,
        public username: string,
        public type: string,
        public quantity: string,
        public area: string,
        public street: string,
        public delivery: string,
        public charges: string,
    ){}
}

//for reply
export class reply{
    constructor(
        public description: string,
        public error: string,
        public username: string
    ){}
}

//for feedback
export class feedback{
    constructor(
        public description: string,
        public username: string
    ){}
}


//for notifications
export class notification{
    constructor(
        public notificationid: string,
        public user: string,
        public vendor: string,
        public type: string,
        public date: string
    ){}
}