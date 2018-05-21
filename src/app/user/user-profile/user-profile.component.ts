import { Component, OnInit, OnDestroy, Output } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { UserProfileService } from "../services/user-profile.service";
import { UserProfileDetails } from "../interfaces/user-profile-details.interface";
import { HeaderService } from "../../services/header.service";
import { RouterService } from "../../services/router.service";

@Component({
    selector: "user-profile",
    templateUrl: "./user-profile.component.html",
    styles: ["user-profile.component.css"]
})
export class UserProfileComponent implements OnInit, OnDestroy {
    private userProfileChangedSubscription: Subscription;
    private userListClearedSubscription: Subscription;
    private headerTitle = "GitHub User Profile";
    userProfile: UserProfileDetails;

    constructor(
        private userProfileService: UserProfileService,
        private headerService: HeaderService,
        private routerService: RouterService
    ) { }

    ngOnInit() {
        this.registerUserProfileChangedSubscription();
        this.registerUserListClearedSubscription();

        if (this.routerService.isProfilePageShown()) {
            this.setHeaderTitle(this.headerTitle);
        }
    }

    ngOnDestroy() {
        this.userProfileChangedSubscription.unsubscribe();
        this.userListClearedSubscription.unsubscribe();
    }

    registerUserProfileChangedSubscription(): void {
        this.userProfileChangedSubscription = this.userProfileService.userProfileDetailsChanged$
            .subscribe((userProfile: UserProfileDetails) => this.userProfile = userProfile);
    }

    registerUserListClearedSubscription(): void {
        this.userListClearedSubscription = this.userProfileService.userListCleared$
            .subscribe(() => this.userProfile = null);
    }

    setHeaderTitle(title: string): void {
        this.headerService.setTitle(title);
    }
}