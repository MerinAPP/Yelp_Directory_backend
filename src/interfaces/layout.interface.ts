import  { Document } from "mongoose";

interface Photo {
    public_id: string;
    url: string;
}

interface Benefit {
    answer: string[];
    question: string;
}

interface Hero {
    photo: Photo;
    title: string;
    subTitle: string;
}

interface About extends Document {
    title: string;
    content: string;
    photo: Photo;
}

interface Feature extends Document {
    title: string;
    subTitle: string;
}

export interface ILayout extends Document {
    benefit: Benefit;
    hero: Hero;
    about: About[];
    feature: Feature[];
}