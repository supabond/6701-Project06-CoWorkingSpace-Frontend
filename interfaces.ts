export interface CoworkingspaceItem {
    _id: string,
    name: string,
    address: string,
    operatingHours: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    id: string
  }
  
export interface CoworkingspaceJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: CoworkingspaceItem[]
  }

export interface BookingItem {
    _id: string;
    bookingDate: string;
    numOfRooms: number;
    user: string;
    coworkingspace: string;
    createdAt: string;
    __v: number;
    id: string;
  }