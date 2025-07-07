import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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
import { InsuranceService } from '../../../../core/services/insurance.service';

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
  @Input() registrationId: string;
  @Input() registration: any;
  registrationForm: FormGroup;
  vehicles: any[] = [];
  clients: any[] = [];
  insurances: any[] = [];

  @Output() registrationAdded = new EventEmitter<void>();
  @Output() registrationChanged = new EventEmitter<void>();

  constructor(private fb: FormBuilder,
              private vehicleService: VehicleService,
              private clientService: ClientService,
              private messageService: MessageService,
              private insuranceService: InsuranceService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['registration'] && this.registrationForm && this.registration) {
      const osiguranjeIds = (this.registration.osiguranja || []).map(
        (insurance: any) => insurance.id.toLowerCase()
      );
  
      this.insurances = this.insurances.map(i => ({
        ...i,
        id: i.id.toLowerCase()
      }));
  
      this.registrationForm.patchValue({
        voziloId: this.registration.voziloId,
        klijentId: this.registration.klijentId,
        datumRegistracije: this.registration.datumRegistracije,
        cijenaRegistracije: this.registration.cijenaRegistracije,
        privremenaRegistracija: this.registration.privremenaRegistracija,
        osiguranjeIds: osiguranjeIds
      });
    }
  }

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
    this.getListOfInsurances();
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

  getListOfInsurances(): void {
    this.insuranceService.getAllInsurances().subscribe({
      next: (res) => {
        res.forEach((insurance) => {
          this.insurances.push(insurance);
        })
      },
      error: (err) => {
        this.messageService.error(err);
      }
    })
  }

  onSave() {
    this.registrationId ? this.onEditRegistration() : this.onAddNewRegistration();
  }

  onEditRegistration() {
    this.registrationChanged.emit(this.registrationForm.value);
  }


  onAddNewRegistration() {
    if (this.registrationForm.valid) {
      this.registrationAdded.emit(this.registrationForm.value);
    }
  }
}