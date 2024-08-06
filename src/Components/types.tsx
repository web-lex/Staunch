interface Item {
    itemName: string;
    qty: string;
    price: string;
    total: string;
  }
  
  export interface FormData {
    companyName: string;
    companyEmail: string;
    country: string;
    city: string;
    postalCode: string;
    streetAddress: string;
    clientName: string;
    clientEmail: string;
    clientCountry: string;
    clientCity: string;
    clientPostalCode: string;
    clientStreetAddress: string;
    invoiceDate: string;
    paymentTerms: string;
    projectDescription: string;
    items: Item[];
  }