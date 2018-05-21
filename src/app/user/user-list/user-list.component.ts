import { Component, OnInit, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { UserProfileService } from "../services/user-profile.service";
import { UserProfile } from "../interfaces/user-profile.interface";
import { HeaderService } from "../../services/header.service";
import { RouterService } from "../../services/router.service";
import { DeviceService } from "../services/device.servive";

@Component({
    selector: "user-list",
    templateUrl: "./user-list.component.html",
    styles: ["user-list.component.css"]
})
export class UserListComponent implements OnInit, OnDestroy {
    private userListChangedSubscription: Subscription;
    private userListClearedSubscription: Subscription;
    private headerTitle = "GitHub Search";
    userProfiles: UserProfile[];

    constructor(
        private userProfileService: UserProfileService,
        private routerService: RouterService,
        private headerService: HeaderService,
        private deviceService: DeviceService
    ) {
        this.userProfiles = [];
    }

    ngOnInit() {
        this.registerUserListChangedSubscription();
        this.registerUserListClearedSubscription();
        this.setHeaderTitle(this.headerTitle);
        this.loadCachedUserProfiles();
    }

    ngOnDestroy() {
        this.userListChangedSubscription.unsubscribe();
        this.userListClearedSubscription.unsubscribe();
    }

    registerUserListChangedSubscription(): void {
        this.userListChangedSubscription = this.userProfileService.userListChanged$
            .subscribe((userProfiles: UserProfile[]) => this.userProfiles.push(...userProfiles));
    }

    registerUserListClearedSubscription(): void {
        this.userListClearedSubscription = this.userProfileService.userListCleared$
            .subscribe(() => this.userProfiles = []);
    }

    setHeaderTitle(title: string): void {
        this.headerService.setTitle(title);
    }

    loadCachedUserProfiles() {
        const cachedUserProfiles = this.userProfileService.getCachedUserProfiles();
        if (cachedUserProfiles) {
            this.userProfiles.push(...cachedUserProfiles);
        }
    }

    onShowUserProfile(username: string): void {
        if (this.deviceService.isSmartphone()) {
            this.routerService.goToProfilePage();
        }
        this.userProfileService.showUserProfile(username);
    }

    onGetUserProfiles(): void {
        const username = this.userProfileService.getUsername();
        if (username) {
            this.userProfileService.getUserProfiles(username);
        }
    }
}