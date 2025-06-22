import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { VehicleFormComponent } from '../components/vehicle-form/vehicle-form.component';

@Component({
  selector: 'app-vehicle-add',
  imports: [MatCardModule, VehicleFormComponent],
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent {}