import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: "./modules/auth/auth.module#AuthModule"
  },
  {
    path: "cabinet",
    loadChildren: "./modules/cabinet/cabinet.module#CabinetModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
