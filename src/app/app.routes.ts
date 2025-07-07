import { Routes } from "@angular/router";
import { NotFoundComponent } from './shared/not-found/not-found.component';

export const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("../../src/app/features/auth/routes").then((m) => m.AUTH_ROUTES),
  },
  {
    path: "vehicle",
    loadChildren: () =>
      import("../../src/app/features/vehicle/routes").then((m) => m.VEHICLE_ROUTES),
  },
  {
    path: "registration",
    loadChildren: () =>
      import("../../src/app/features/registration/routes").then((m) => m.REGISTRATION_ROUTES),
  },
  {
    path: "client",
    loadChildren: () =>
      import("../../src/app/features/client/routes").then((m) => m.CLIENT_ROUTES),
  },
  {
    path: "insurance",
    loadChildren: () =>
      import("../../src/app/features/insurance/routes").then((m) => m.INSURANCE_ROUTES),
  },
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  { path: '**', component: NotFoundComponent },
];
