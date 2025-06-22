import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../../../core/services/vehicle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent {
  vehicleForm: FormGroup;
  marke = ['Toyota', 'Volkswagen', 'BMW', 'Mercedes', 'Audi'];
  sviModeli: { [marka: string]: string[] } = {
    Toyota: ['Corolla', 'Yaris', 'Camry'],
    Volkswagen: ['Golf', 'Passat', 'Polo'],
    BMW: ['320', 'X5', 'M4'],
    Mercedes: ['A-Class', 'C-Class', 'E-Class'],
    Audi: ['A3', 'A4', 'Q5']
  };
  tipovi = ['Putničko', 'Teretno', 'SUV', 'Kombi', 'Motocikl'];
  modeli: string[] = [];  

  constructor(private fb: FormBuilder,
              private vehicleService: VehicleService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      brojSasije: [''],
      datumPrveRegistracije: [''],
      datumRegistracije: [''],
      godinaProizvodnje: [''],
      marka: [''],
      model: [''],
      tip: [''],
      registarskaOznaka: [''],
      masa: [''],
      snagaMotora: [''],
      zapreminaMotora: [''],
      vrstaGoriva: ['']
    });

    this.vehicleForm.get('marka')?.valueChanges.subscribe((marka) => {
      this.modeli = this.sviModeli[marka] || [];
      this.vehicleForm.get('model')?.setValue('');
    })
  };

  addNewVehicle() {
    if (this.vehicleForm.valid) {
      this.vehicleService.addNewVehicle(this.vehicleForm.value).subscribe({
        next: (res) => {
          this.router.navigate(['/vehicle/list']);
        },
        error: (err) => console.log(err)
      });
    }
  }
}