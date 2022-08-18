export class Bag{ 
    constructor(
        public id: string,
        public title: string,
        public brand: string,
        public imageUrl: string,
        public price: number,
        public vendorId: string,
        public vendorName: string
    ){}
}

export class Saved{ 
    constructor(
        public id: string,
        public title: string,
        public brand: string,
        public imageUrl: string,
        public price: number,
        public vendorId: string,
        public vendorName: string
    ){}
}

