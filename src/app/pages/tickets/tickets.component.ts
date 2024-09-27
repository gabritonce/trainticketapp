import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainService } from '../../service/train.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  standalone: true,
  imports: [CommonModule] // Aggiungi CommonModule qui
})
export class TicketComponent implements OnInit {
  passengerId: number = 0;
  bookingPassengerId: number = 0;

  
  ticket: any;
  lastTwoTickets: any[] = [];
    activatedRouter = inject(ActivatedRoute);
  trainService = inject(TrainService);

  ngOnInit(): void {
    // Recupera il passengerId dalla rotta
    this.passengerId = this.activatedRouter.snapshot.params['passengerId'];

    // Chiama il servizio per ottenere i dati del ticket
    this.getTicketDetails();
  }

  getTicketDetails() {
    this.trainService.getTicket(this.passengerId).subscribe(
      (res: any) => {
        this.ticket = res.data.slice(0, 2);

        // Se res.data è un array di passeggeri
        if (Array.isArray(this.ticket) && this.ticket.length > 0) {
            // Prendi solo gli ultimi due passeggeri
            this.ticket.slice(0, 2);
            console.log('Last Two Ticket Details:', this.ticket);
        } else {
            console.log('No passengers found.');
        }
      },
      (error) => {
        console.error('Error fetching ticket:', error);
      }
    );
}}
