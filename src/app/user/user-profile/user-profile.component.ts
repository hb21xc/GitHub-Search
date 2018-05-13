import { Component, OnInit, OnDestroy, Output } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { UserProfileService } from "../services/user-profile.service";
import { UserProfileDetails } from "../interfaces/user-profile-details.interface";

@Component({
    selector: "user-profile",
    templateUrl: "./user-profile.component.html",
    styles: ["user-profile.component.css"]
})
export class UserProfileComponent implements OnInit, OnDestroy {
    private userProfileSubscription: Subscription;
    private userListSubscription: Subscription;
    userProfile: UserProfileDetails;

    constructor(private userProfileService: UserProfileService) { }

    ngOnInit() {
        this.userProfileSubscription = this.userProfileService.userProfile$
            .subscribe((userProfile: UserProfileDetails) => {
                this.userProfile = userProfile;
            });
        this.userListSubscription = this.userProfileService.userList$
            .subscribe(() => {
                this.userProfile = null;
            });
    }

    ngOnDestroy() {
        this.userProfileSubscription.unsubscribe();
        this.userListSubscription.unsubscribe();
    }
}