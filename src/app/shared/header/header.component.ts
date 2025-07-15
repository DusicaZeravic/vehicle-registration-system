import { Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-header",
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  constructor(private router: Router) {}
  logout() {
    localStorage.clear();
    this.router.navigate(["/auth/login"]);
  }
}
