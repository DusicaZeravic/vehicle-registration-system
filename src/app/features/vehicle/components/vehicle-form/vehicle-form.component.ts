import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { CommonModule } from "@angular/common";
import { VehicleService } from "../../../../core/services/vehicle.service";
import { Router } from "@angular/router";
import { MessageService } from '../../../../core/services/message.service';

@Component({
  selector: "app-vehicle-form",
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
  templateUrl: "./vehicle-form.component.html",
})
export class VehicleFormComponent {
  vehicleForm: FormGroup;
  vehicleTypes: Array<{ id: string; naziv: string; kategorija: string }> = []; // change type
  vehicleBrands: Array<{ id: string; naziv: string; tipVozilaId: string }> = [];
  vehicleBrandModels: Array<{ id: string; naziv: string; markaId: string }> =
    [];
  vehicleFuelTypes: Array<string> = [
    "Benzin",
    "Dizel",
    "Električni pogon",
    "Hibrid",
    "Tečni naftni gas",
    "Kompresovani prirodni gas",
  ];
  @Output() vehicleAdded = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vehicleForm = this.fb.group({
      brojSasije: [""],
      datumPrveRegistracije: [""],
      datumRegistracije: [""],
      godinaProizvodnje: [""],
      markaVozilaId: [""],
      modelVozilaId: [""],
      tipVozilaId: [""],
      registarskaOznaka: [""],
      masa: [""],
      snagaMotora: [""],
      zapreminaMotora: [""],
      vrstaGoriva: [""],
    });
    this.getVehicleTypes();

    this.vehicleForm.get("tipVozilaId")?.valueChanges.subscribe((tip) => {
      if (tip) {
        this.getVehicleBrands(tip);
      }
    });

    this.vehicleForm.get("markaVozilaId")?.valueChanges.subscribe((marka) => {
      if (marka) {
        this.getVehicleModels(marka);
      }
    });
  }

  getVehicleTypes(): void {
    this.vehicleTypes = [];
    this.vehicleService.getVehicleTypes().subscribe({
      next: (res) => {
        res.forEach((vehicleType) => {
          this.vehicleTypes.push(vehicleType);
        });
      },
      error: (err) => {
        this.messageService.error(err);
      },
    });
  }

  getVehicleBrands(vehicleTypeId: string): void {
    this.vehicleBrands = [];
    this.vehicleService.getVehicleBrands(vehicleTypeId).subscribe({
      next: (res) => {
        res.forEach((vehicleBrand) => {
          this.vehicleBrands.push(vehicleBrand);
        });
      },
      error: (err) => {
        this.messageService.error(err);
      },
    });
  }

  getVehicleModels(brandId: string): void {
    this.vehicleBrandModels = [];
    this.vehicleService.getVehicleModels(brandId).subscribe({
      next: (res) => {
        res.forEach((vehicleBrandModel) => {
          this.vehicleBrandModels.push(vehicleBrandModel);
        });
      },
      error: (err) => {
        this.messageService.error(err);
      },
    });
  }

  onAddNewVehicle() {
    if (this.vehicleForm.valid) {
      this.vehicleAdded.emit(this.vehicleForm.value);
    }
  }
}
