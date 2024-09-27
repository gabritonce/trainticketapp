import { Component, inject,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIresponse, Customer, IStation, ITrain, SearchData } from '../../model/train';
import { TrainService } from '../../service/train.service';
import { DatePipe, NgFor } from '@angular/common';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms';
import { routes } from '../../app.routes';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [DatePipe,CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{

  router =  inject(Router);
  activatedRouter = inject(ActivatedRoute);
  tarinerService = inject(TrainService)
  seachData:SearchData = new SearchData()
  trainlist : ITrain[] = [];
  stationList:IStation[]=[];
  fromStationId: number = 0;
  toStationId: number = 0;
  dateOfTravel: string = '';
selectedTrain?: ITrain;
passenger: any = {
  "passengerName": "",
  "age":""
}

passengerList: any[] = [];
loagedUserData?: Customer = new Customer();

  constructor(){
    const localData = localStorage.getItem('trainApp')
    if(localData != null){
      this.loagedUserData = JSON.parse(localData)
    }
    this.activatedRouter.params.subscribe((res:any)=>{
      debugger;
      this.seachData.fromStationId = res.fromStationId;
      this.seachData.toStationId = res.toStationId;
      this.seachData.dateOfTravel = res.dateOfTravel;
      this.getSearchTrains()
    })
  }
  ngOnInit(): void {
    this.loadAllStation()
  }

  addPassenger() {
    const strObj = JSON.stringify(this.passenger);
    const parseObj = JSON.parse(strObj);
    this.passengerList.push(parseObj);
  
    // Pulire il form dopo aver aggiunto un passeggero
    this.passenger = {
      nome: '',
      cognome: '',
      età: null
    };
  }
  
  DeletePassenger(index: number) {
   
    this.passengerList.splice(index, 1);
  }

  loadAllStation(){
    this.tarinerService.getAllStations(this.fromStationId, this.toStationId,this.dateOfTravel).subscribe((res:any)=>{
   this.stationList= res.data;
    })
   } 
  getSearchTrains(){
    this.tarinerService.getTrainsSearch(this.seachData.fromStationId, this.seachData.toStationId, this.seachData.dateOfTravel).subscribe((res:any)=>{
      debugger;
      this.trainlist = res.data;

    })
  }
  open(train: ITrain){
    this.selectedTrain = train;
    const model = document.getElementById('myBookModal');
    if(model != null ){
      model.style.display = ' block'
    }
  }
  close(){
    const model = document.getElementById('myBookModal');
    if(model != null ){
      model.style.display = 'none'
    }
  }

bookTicket(){
  const bookingObj = {
    "bookingId":0,
    "trainId":this.selectedTrain?.trainId,
    "passengerId":this.loagedUserData?.passengerID,
    "travelDate":this.seachData.dateOfTravel ,
    "bookingDate": new Date(),
    "totalSeats":0,
    "TrainAppBookingPassengers":[] as any
  }
  bookingObj.TrainAppBookingPassengers = this.passengerList
  bookingObj.totalSeats = this.passengerList.length;
  this.tarinerService.bookTrain(bookingObj).subscribe((re:APIresponse)=>{
    if(re.result){
      alert("Ticket Booked Succed")
      this.router.navigate(['/ticket', this.loagedUserData?.passengerID]);
    } else {
      alert("Error:You have to be logged");
    }
  });
}
}
