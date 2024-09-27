import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
constructor(private router: Router){}
isFixedFooter(): boolean {
  // Percorsi in cui vuoi fissare il footer
  const fixedFooterPages = [ '/search','search/:fromStationId/:toStationId/:dateOfTravel', '/ticket']; // Modifica con le tue rotte
  return fixedFooterPages.includes(this.router.url);
}
}


