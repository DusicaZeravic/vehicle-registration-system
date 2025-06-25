import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { VehicleService } from '../../../core/services/vehicle.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MessageService } from '../../../core/services/message.service';
import { ToastrModule } from 'ngx-toastr';

@Component({
  imports: [
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ToastrModule
  ],
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
})
export class VehicleListComponent {
  vehicles: any[] = []; // napraviti model

  displayedColumns: string[] = [
    'registarskaOznaka',
    'tip',
    'marka',
    'model',
    'godinaProizvodnje',
    'vrstaGoriva',
    'datumRegistracije',
    'actions'
  ];

  constructor(private vehicleService: VehicleService,
              private messageService: MessageService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.getListOfVehicles();
  }

  getListOfVehicles(): void {
    this.vehicles = [];
    this.vehicleService.getAllVehicles().subscribe({
      next: (res) => {
        res.forEach((vehicle) => {
          this.vehicles.push(vehicle);
        });
      },
      error: (err) => {
        this.messageService.error(err);
      }
    })
  }

  onEditVehicle(vehicle: any): void {
    this.router.navigate(['/vehicle', vehicle.id]);
  }

  navigateToVehicleCreatePage(): void {
    this.router.navigate(['/vehicle/add']);
  }
}