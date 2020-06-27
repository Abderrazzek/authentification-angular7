import { AuthService } from "./auth.service";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";

import { SignupComponent } from "./pages/signup/signup.component";

@NgModule({
  declarations: [SignupComponent, LoadingSpinnerComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthModule {}
