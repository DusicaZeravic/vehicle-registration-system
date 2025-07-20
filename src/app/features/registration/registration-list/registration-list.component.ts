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
import { QuestionModalComponent } from '../../../shared/components/question-modal/question-modal.component';
import { EmptyListComponent } from '../../../shared/components/empty-list/empty-list.component';
import { SearchComponent } from '../../../shared/components/search/search.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ToastrModule,
    EmptyListComponent,
    SearchComponent,
    PaginationComponent
  ],
})

export class RegistrationListComponent {
  dialog = inject(MatDialog);
  registrations: any[] = [];
  searchTerm: string = '';
  totalItems: number;
  currentPageSize: number = 5;
  currentPage: number = 1;

  displayedColumns: string[] = [
    'voziloMarkaModel',
    'registarskaOznaka',
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
    this.registrationService.getAllRegistartions(this.searchTerm, this.currentPageSize, this.currentPage).subscribe({
      next: (res) => {
        this.registrations = [];
        res.data.items.forEach((vehicle) => {
          this.registrations.push(vehicle);
        });
        this.totalItems = res.data.totalCount;
      },
      error: (err) => {
        this.messageService.error(err);
      }
    })
  }

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.getListOfRegistrations();
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

  onPaginationChange(event: { pageNumber: number }) {
    this.currentPage = event.pageNumber;
    this.getListOfRegistrations();
  }
}