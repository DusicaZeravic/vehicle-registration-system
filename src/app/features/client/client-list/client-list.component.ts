import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MessageService } from '../../../core/services/message.service';
import { ToastrModule } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { QuestionModalComponent } from '../../../shared/question-modal/question-modal.component';
import { ClientService } from '../../../core/services/client.service';
import { CommonModule } from '@angular/common';
import { EmptyListComponent } from '../../../shared/empty-list/empty-list.component';

@Component({
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ToastrModule,
    EmptyListComponent
  ],
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
})
export class ClientListComponent {
  dialog = inject(MatDialog);
  clients: any[] = []; // napraviti model

  displayedColumns: string[] = [
    'ime',
    'prezime',
    'adresa',
    'jmbg',
    'datumRodjenja',
    'brojTelefona',
    'email',
    'actions'
  ];

  constructor(private clientService: ClientService,
              private messageService: MessageService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.getListOfClients();
  }

  getListOfClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (res) => {
        this.clients = [];
        res.forEach((vehicle) => {
          this.clients.push(vehicle);
        });

      },
      error: (err) => {
        this.messageService.error(err);
      }
    })
  }

  onEditClient(client: any): void {
    this.router.navigate(['/client', client.id]);
  }

  navigateToClientCreatePage(): void {
    this.router.navigate(['/client/add']);
  }

  onDeleteClient(client: any) {
    this.dialog.open(QuestionModalComponent, {
      width: '400px',
    }).afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteClient(client);
      }
    });
  }

  deleteClient(client: any) {
    this.clientService.deleteClient(client.id).subscribe({
      next: () => {
        this.getListOfClients();
        this.messageService.success('Uspješno ste obrisali klijenta.');
      },
      error: (err) => {
        this.messageService.error(err);
      }
    })
  }
}