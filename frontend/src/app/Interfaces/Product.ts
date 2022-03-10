export interface Review {
    text: string;
    stars: number;
    user: any;
    name: string;
    date: string;
}

export interface Product {
    _id: string;
    title: string;
    price: number;
    description: string;
    image: string[];
    countInStock: number;
    inCart?: boolean;
    review: {
        rating: number;
        numReviews: number;
        comments: Review[];
    };
}