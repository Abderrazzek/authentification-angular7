import { environment } from "./../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
export interface AuthResponseData {
  firstName?: string;
  lastName?: string;
  mobile_phone?: string;
  bio?: string;
  picture?: string;
  identity_proof_doc?: string;
  accountVerified?: boolean;
  firstUpdate?: boolean;
  role?: string;
  realm?: string;
  username?: string;
  email: string;
  emailVerified?: boolean;
  id?: any;
  createdAt: Date;
  updatedAt: Date;
  professionId?: any;
  experienceId?: any;
  password?: string;
  ttl?: number;
  created?: Date;
  principatType?: string;
  userId?: string;
}
export interface BookingResponseData {
  state: string;
  start_date: Date;
  end_date: Date;
  total_price: number;
  id?: any;
  renterId?: any;
  cabinetId?: any;
  createdAt: Date;
  updatedAt: Date;
  sessions_ids?: Array<any>;
}
@Injectable({
  providedIn: "root"
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  isLoggedIn: boolean = false;
  lastUrl: String = "";

  constructor(private http: HttpClient) {}

  signUp(email: String, password: String) {
    return this.http.post<AuthResponseData>(
      "http://localhost:3000/api/Renters",
      {
        email: email,
        password: password
      }
    );
  }
  login(email: String, password: String) {
    return this.http
      .post<AuthResponseData>("http://localhost:3000/api/Renters/login", {
        email: email,
        password: password
      })
      .pipe(
        tap(resData => {
          const expirationDate = new Date(
            new Date().getTime() + +resData.ttl * 1000
          );
          const user = new User(
            resData.email,
            resData.userId,
            resData.id,
            expirationDate
          );
          this.user.next(user);
          this.autoLogout(resData.ttl * 1000);
          localStorage.setItem("userData", JSON.stringify(user));
        })
      );
  }
  logout() {
    this.user.next(null);
    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }
}
