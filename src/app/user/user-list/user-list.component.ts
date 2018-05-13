import { Component, EventEmitter, OnInit, OnDestroy, Output } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { UserProfileService } from "../services/user-profile.service";
import { UserProfile } from "../interfaces/user-profile.interface";

@Component({
    selector: "user-list",
    templateUrl: "./user-list.component.html",
    styles: ["user-list.component.css"]
})
export class UserListComponent implements OnInit, OnDestroy {
    private userListSubscription: Subscription;
    userProfiles: UserProfile[];
    @Output() profileClickedEvent = new EventEmitter();
    profileClicked = false;

    constructor(private userProfileService: UserProfileService) { }

    ngOnInit() {
        this.userListSubscription = this.userProfileService.userList$
            .subscribe((userProfiles: UserProfile[]) => {
                this.userProfiles = userProfiles;
                this.sendEvent(false);
            });
    }

    ngOnDestroy() {
        this.userListSubscription.unsubscribe();
    }

    sendEvent(status) {
        this.profileClicked = status;
        this.profileClickedEvent.emit(this.profileClicked);
    }

    onShowUserProfile(username: string): void {
        this.sendEvent(true);
        this.userProfileService.getUserProfile(username);
    }
}