import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { take, exhaustMap } from "rxjs/operators";
export interface CabinetInterface {
  name?: string;
  space_type?: string;
  full_address?: string;
  city?: string;
  country?: string;
  zip_code?: number;
  area?: number;
  images?: Array<any>;
  state: string;
  description?: string;
  conditions?: string;
  obligations?: string;
  half_day_price?: number;
  day_price?: number;
  bookingsNumber?: number;
  feedbackAvgNote?: number;
  feedbackCount?: number;
  ownerId?: any;
  id?: any;
  createdAt: Date;
  updatedAt: Date;
  professionIds?: Array<any>;
  characteristicIds?: Array<any>;
  otherCharacteristicIds?: Array<any>;
}
@Injectable({
  providedIn: "root"
})
export class DataStorageService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  cabinet() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<CabinetInterface[]>(
          "http://localhost:3000/api/Cabinets",
          { params: new HttpParams().set("access_token", user.token) }
        );
      })
    );
  }
}
