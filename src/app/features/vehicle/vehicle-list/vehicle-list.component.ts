import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { VehicleService } from '../../../core/services/vehicle.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
    'marka',
    'model',
    'godinaProizvodnje',
    'vrstaGoriva',
    'datumRegistracije'
  ];

  constructor(private vehicleService: VehicleService) {}

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
}