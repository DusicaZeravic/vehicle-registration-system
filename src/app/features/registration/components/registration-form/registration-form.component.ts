import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehicleService } from '../../../../core/services/vehicle.service';
import { MessageService } from '../../../../core/services/message.service';
import { ClientService } from '../../../../core/services/client.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSlideToggleModule,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()]
})
export class RegistrationFormComponent {
  registrationForm: FormGroup;
  vehicles: any[] = [];
  clients: any[] = [];
  insurances: any[] = [
    {id: 'E40105EB-D13B-43E8-D893-08DDB33FBCEA', naziv: 'Sava Osiguranje', tipOsiguranja: 'Kasko'},
    {id: '5CE4B9B0-8819-4C04-D894-08DDB33FBCEA', naziv: 'Delta Generali', tipOsiguranja: 'Auto - odgovornost'},
    {id: '47FCFBB1-6B6A-41D5-D895-08DDB33FBCEA', naziv: 'Sava Osiguranje', tipOsiguranja: 'Osiguranje vozila od pozara'},
  ];

  @Output() registrationAdded = new EventEmitter<void>();

  constructor(private fb: FormBuilder,
              private vehicleService: VehicleService,
              private clientService: ClientService,
              private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      voziloId: ["", Validators.required],
      klijentId: ["", Validators.required],
      datumRegistracije: [new Date(), Validators.required],
      cijenaRegistracije: [null, Validators.required],
      privremenaRegistracija: [false, Validators.required],
      osiguranjeIds: [[], [Validators.required, Validators.min(1)]],
    });

    this.getListOfVehicles();
    this.getListOfClients();
  }


  getListOfVehicles(): void {
    this.vehicleService.getAllVehicles().subscribe({
      next: (res) => {
        this.vehicles = [];
        res.forEach((vehicle) => {
          this.vehicles.push(vehicle);
        });

      },
      error: (err) => {
        this.messageService.error(err);
      }
    })
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

  onAddNewRegistration() {
    if (this.registrationForm.valid) {
      this.registrationAdded.emit(this.registrationForm.value);
    }
  }
}