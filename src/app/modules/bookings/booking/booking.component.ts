import { DataStorageService } from "./../../auth/data-storage.service";
import { Component, OnInit } from "@angular/core";
import { take, exhaustMap } from "rxjs/operators";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.scss"]
})
export class BookingComponent implements OnInit {
  cabinets;
  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit() {
    this.dataStorageService.cabinet().subscribe(res => {
      console.log(res);
      this.cabinets = res;
    });
  }
}
