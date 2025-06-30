import { Component, inject } from '@angular/core';
import { RegistrationService } from '../../../core/services/registration.service';
import { MessageService } from '../../../core/services/message.service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { QuestionModalComponent } from '../../../shared/question-modal/question-modal.component';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ToastrModule
  ],
  styleUrls: ['./registration-list.component.css']
})

export class RegistrationListComponent {
  dialog = inject(MatDialog);
  registrations: any[] = [];

  displayedColumns: string[] = [
    'voziloMarkaModel',
    'voziloRegistarskaOznaka',
    'vlasnik',
    'datumRegistracije',
    'datumIstekaRegistracije',
    'cijenaRegistracije',
    'actions'
  ];

  constructor(private registrationService: RegistrationService,
              private messageService: MessageService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.getListOfRegistrations();
  }

  getListOfRegistrations(): void {
    this.registrationService.getAllRegistartions().subscribe({
      next: (res) => {
        this.registrations = [];
        res.forEach((vehicle) => {
          this.registrations.push(vehicle);
        });

      },
      error: (err) => {
        this.messageService.error(err);
      }
    })
  }

  navigateToRegistrationCreatePage(): void {
    this.router.navigate(['/registration/add']);
  }

  onEditRegistration(registration: any): void {
    this.router.navigate(['/registration', registration.id]);
  }

    onDeleteRegistration(registration: any) {
      this.dialog.open(QuestionModalComponent, {
        width: '400px',
      }).afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.deleteRegistration(registration);
        }
      });
    }
  
    deleteRegistration(registration: any) {    
      this.registrationService.deleteRegistration(registration.id).subscribe({
        next: () => {
          this.getListOfRegistrations();
          this.messageService.success('Uspješno ste obrisali registraciju.');
        },
        error: (err) => {
          this.messageService.error(err);
        }
      })
    }
}