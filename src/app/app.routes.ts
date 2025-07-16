import { Routes } from "@angular/router";
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { IsLoggedGuard } from './core/guards/is-logged.guard';

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
    canActivate: [IsLoggedGuard]
  },
  {
    path: "registration",
    loadChildren: () =>
      import("../../src/app/features/registration/routes").then((m) => m.REGISTRATION_ROUTES),
    canActivate: [IsLoggedGuard]
  },
  {
    path: "client",
    loadChildren: () =>
      import("../../src/app/features/client/routes").then((m) => m.CLIENT_ROUTES),
    canActivate: [IsLoggedGuard]
  },
  {
    path: "insurance",
    loadChildren: () =>
      import("../../src/app/features/insurance/routes").then((m) => m.INSURANCE_ROUTES),
    canActivate: [IsLoggedGuard]
  },
  {
    path: "user",
    loadChildren: () =>
      import("../../src/app/features/user/routes").then((m) => m.USER_ROUTES),
    canActivate: [IsLoggedGuard]
  },
  {
    path: "",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  { path: '**', component: NotFoundComponent },
];
