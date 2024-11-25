export interface AddEvent{
    eventId?:number;
    eventName:string;
    description:string;
    startDate:string;
    location:string;
    category:string;
    eventImageFile?: File; // Optional field for the image file
    imageUrl?: string; // Optional, used for displaying the uploaded image
}