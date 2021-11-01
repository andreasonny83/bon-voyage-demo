export interface SearchInput {
  lat: number;
  lng: number;
}

interface Amenity {
  code: number;
  formatted: string;
}

interface HotelImage {
  altText: string;
  height: number;
  isHeroImage: Boolean;
  url: string;
  width: number;
}

export interface HotelDataAddress {
  line1: string;
  line2: string;
  city: string;
  postalCode: string;
  region: string;
  country: string;
  countryName: string;
}

export interface HotelLocation {
  longitude: number;
  latitude: number;
}

export interface RoomType {
  amenities: Amenity;
  description: string;
  images: Array<HotelImage>;
  maxOccupancy: number;
  name: string;
  rates: Array<string>;
  roomTypeId: string;
}

export interface RoomBooking {
  rateId: string;
  adults: number;
}

export interface HotelBooking {
  start: string;
  end: string;
  bookingContact: {
    firstName: string;
    lastName: string;
    email: string;
  };
  rooms: Array<RoomBooking>;
}

export interface HotelData {
  address: HotelDataAddress;
  amenities: Array<Amenity>;
  checkIn: {
    from: string;
  };
  checkOut: {
    to: string;
  };
  createdAt: string;
  currency: string;
  description: {
    short: string;
  };
  emails: Array<string>;
  externalUrls: Array<string>;
  hotelId: string;
  images: Array<HotelImage>;
  location: HotelLocation;
  name: string;
  phoneNumbers: Array<string>;
  roomCount: number;
<<<<<<< HEAD
  roomTypes: Array<{
    amenities: Amenity;
    description: string;
    images: Array<Image>;
    maxOccupancy: number;
    name: string;
    rates: Array<string>;
    roomTypeId: string;
  }>;
=======
  roomTypes: Array<RoomType>;
>>>>>>> 7cd3a1017f5ba53840cd95b60c48b65ed25f6df6
  starRating: number;
  termsAndConditions: string;
  updatedAt: string;
  websiteUrl: string;
}
