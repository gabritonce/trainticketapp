import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIresponse, Customer} from '../model/train'; 

@Injectable({
  providedIn: 'root'
})
export class TrainService {
apiUrl: string = "https://freeapi.miniprojectideas.com/api/TrainApp/";


  constructor( private  http: HttpClient) { }

  getAllStations(fromStationId: number, toStationId: number, dateOfTravel: string){
   return this.http.get(`${this.apiUrl}GetAllStations`)
  }
  getTrainsSearch(from:number, to: number, date:string){
    return this.http.get(`${this.apiUrl}GetTrainsBetweenStations?departureStationId=${from}&arrivalStationId=${to}&departureDate=${date}`)
  }
  createNewCustmer(obj: Customer){
    return this.http.post<APIresponse>(`${this.apiUrl}AddUpdatePassengers`, obj)
  }

  onLogin(obj: any){
    return this.http.post<APIresponse>(`${this.apiUrl}login`, obj)
  }
  bookTrain(obj: any){
    return this.http.post<APIresponse>(`${this.apiUrl}bookTrain`, obj)
  }

  getTicket(passengerId: number) {
    return this.http.get(`${this.apiUrl}GetBookingByPassengerId?passengerId=${passengerId}`);
  }
}
