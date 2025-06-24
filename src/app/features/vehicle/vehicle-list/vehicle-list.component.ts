import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { VehicleService } from '../../../core/services/vehicle.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  imports: [
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
  ],
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  // styleUrls: ['./vehicle-list.component.css'],
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
              private router: Router
  ) {}

  ngOnInit(): void {
    this.getListOfVehicles();
  }

  getListOfVehicles(): void {
    this.vehicleService.getAllVehicles().subscribe({
      next: (res) => {
        this.vehicles = res;
      },
      error: (err) => console.log(err)
    })
  }

  onEditVehicle(vehicle: any): void {
    this.router.navigate(['/vehicle', vehicle.id]);
  }

  navigateToVehicleCreatePage(): void {
    this.router.navigate(['/vehicle/add']);
  }
}