import { AppComponent } from "./app.component";
import { AuthGuard } from "./modules/auth/auth.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: "./modules/auth/auth.module#AuthModule"
  },
  {
    path: "",
    component: AppComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "cabinet",
    loadChildren: "./modules/bookings/bookings.module#BookingsModule",
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
