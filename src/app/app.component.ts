import { Component, Input } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  decrease = false;

  onProfileClicked(value) {
    this.decrease = value;
  }
}