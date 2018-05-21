import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Injectable()
export class RouterService {

    constructor(private router: Router, private location: Location) { }

    canGoBack() {
        return !(this.location.isCurrentPathEqualTo("/") || this.location.isCurrentPathEqualTo("/userList"));
    }

    goBack(): void {
        this.location.back();
    }

    goToRootPage(): void {
        this.router.navigate(["/"]);
    }

    isProfilePageShown(): boolean {
        return this.location.isCurrentPathEqualTo("/userProfile");
    }

    goToProfilePage(): void {
        this.router.navigate(["/userProfile"]);
    }
}