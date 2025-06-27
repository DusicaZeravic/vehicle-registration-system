import { Component } from '@angular/core';
import { RegistrationService } from '../../../core/services/registration.service';
import { MessageService } from '../../../core/services/message.service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

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
  registrations: any[] = [];

  displayedColumns: string[] = [
    'voziloMarkaModel',
    'voziloRegistarskaOznaka',
    'vlasnik',
    'datumRegistracije',
    'datumIstekaRegistracije',
    'cijenaRegistracije'
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
}