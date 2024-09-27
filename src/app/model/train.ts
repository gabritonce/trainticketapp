export interface IStation {
    stationID : number;
    stationName: string;
    stationCode: string;
}


export interface APIresponse{
    message:number;
    result: boolean;
    data: any;

}

export class SearchData {
    fromStationId : number;
    toStationId: number;
    dateOfTravel: string;
    
    constructor(){

        this.toStationId = 0;
        this.fromStationId = 0;     
        this.dateOfTravel = '';
    }
}

export interface ITrain {
    trainId: number;
    trainNo: number;
    trainName: string;
    departureStationName: string;
    arrivalStationName: string;
    arrivalTime: string;
    departureTime: string;
    totalSeats: number;
    departureDate: string;
    bookedSeats: number;
  }




  export class Customer {
    passengerID: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    
    constructor(){
        this.email = '';
        this.firstName = '';
        this.lastName = '';
        this.passengerID = 0;
        this.phone ='';
        this.password = '';

    }
  }

  export interface Ticket {
    trainId: number
    trainName: string
    trainNo: number
    departureStationName: string
    seatNo: number
    arrivalStationName: string
    arrivalTime: string
    departureTime: string
    departureDate: string
    passengerName: string
    age: number
    bookingPassengerId: number
  }

