export const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\S]{8,}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const DOMAIN_REGEX = /^(?:[-A-Za-z0-9]+\.)+[A-Za-z]{2,}$/;
export const URL_REGEX = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s?#\/]+)*(?:\?[^\s#]+)?$/;


export const API_URL = "http://localhost:5000"


export const ProductCategoryType = [
    { id : 1, label : "Airpodes", value : "Airpodes"},
    { id : 2, label : "Camera", value : "Camera"},
    { id : 3, label : "Earphones", value : "Earphones"},
    { id : 4, label : "Mobiles", value : "Mobiles"},
    { id : 5, label : "Mouse", value : "Mouse"},
    { id : 6, label : "Printers", value : "Printers"},
    { id : 7, label : "Processor", value : "Processor"},
    { id : 8, label : "Refrigerator", value : "Refrigerator"},
    { id : 9, label : "Speakers", value : "Speakers"},
    { id : 10, label : "Trimmers", value : "Trimmers"},
    { id : 11, label : "Televisions", value : "Televisions"},
    { id : 12, label : "Watches", value : "Watches"},
]
