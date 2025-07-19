import { Component, inject } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { VehicleService } from "../../../core/services/vehicle.service";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
import { MessageService } from "../../../core/services/message.service";
import { ToastrModule } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { QuestionModalComponent } from "../../../shared/question-modal/question-modal.component";
import { CommonModule } from "@angular/common";
import { EmptyListComponent } from "../../../shared/empty-list/empty-list.component";
import { SearchComponent } from '../../../shared/search/search.component';

@Component({
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ToastrModule,
    EmptyListComponent,
    SearchComponent
  ],
  selector: "app-vehicle-list",
  templateUrl: "./vehicle-list.component.html",
})
export class VehicleListComponent {
  dialog = inject(MatDialog);
  vehicles: any[] = []; // napraviti model
  searchTerm: string = '';

  displayedColumns: string[] = [
    "registarskaOznaka",
    "tip",
    "marka",
    "model",
    "godinaProizvodnje",
    "vrstaGoriva",
    "datumRegistracije",
    "actions",
  ];

  constructor(
    private vehicleService: VehicleService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getListOfVehicles();
  }

  getListOfVehicles(): void {
    this.vehicleService.getAllVehicles(this.searchTerm).subscribe({
      next: (res) => {
        this.vehicles = [];
        res.data.items.forEach((vehicle) => {
          this.vehicles.push(vehicle);
        });
      },
      error: (err) => {
        this.messageService.error(err);
      },
    });
  }

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.getListOfVehicles();
  }

  onEditVehicle(vehicle: any): void {
    this.router.navigate(["/vehicle", vehicle.id]);
  }

  navigateToVehicleCreatePage(): void {
    this.router.navigate(["/vehicle/add"]);
  }

  onDeleteVehicle(vehicle: any) {
    this.dialog
      .open(QuestionModalComponent, {
        width: "400px",
      })
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.deleteVehicle(vehicle);
        }
      });
  }

  deleteVehicle(vehicle: any) {
    this.vehicleService.deleteVehicle(vehicle.id).subscribe({
      next: () => {
        this.getListOfVehicles();
        this.messageService.success("Uspješno ste obrisali vozilo.");
      },
      error: (err) => {
        this.messageService.error(err);
      },
    });
  }
}
