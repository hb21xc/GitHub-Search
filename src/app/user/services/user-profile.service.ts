import { Injectable } from "@angular/core";

import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

import { GitHubService } from "./github.service";
import { UserProfile } from "../interfaces/user-profile.interface";
import { UserProfileDetails } from "../interfaces/user-profile-details.interface";

@Injectable()
export class UserProfileService {
    private userListChanged: Subject<UserProfile[]>;
    private userListCleared: Subject<void>;
    private userProfileDetailsChanged: Subject<UserProfileDetails>;
    private userProfiles: UserProfile[];
    private currentPageNo: number;
    private username: string;
    userListChanged$: Observable<UserProfile[]>;
    userListCleared$: Observable<void>;
    userProfileDetailsChanged$: Observable<UserProfileDetails>;

    constructor(private gitHubSerive: GitHubService) {
        this.userListChanged = new Subject<UserProfile[]>();
        this.userProfileDetailsChanged = new Subject<UserProfileDetails>();
        this.userListCleared = new Subject<void>();
        this.userListChanged$ = this.userListChanged.asObservable();
        this.userListCleared$ = this.userListCleared.asObservable();
        this.userProfileDetailsChanged$ = this.userProfileDetailsChanged.asObservable();
        this.userProfiles = [];
        this.currentPageNo = 1;
    }

    searchByUsername(username: string): void {
        this.clear();
        this.username = username;
        this.getUserProfiles(username);
    }

    showUserProfile(username: string): void {
        this.gitHubSerive.getUserProfileDetails(username).subscribe((userProfile: UserProfileDetails) => {
            this.notifyUserProfileDetailsChanged(userProfile);
        });
    }

    getUserProfiles(username: string) {
        this.gitHubSerive.getUserProfiles(username, this.currentPageNo).subscribe((userList: any) => {
            this.currentPageNo++;
            this.userProfiles.push(...userList.items);
            this.notifyUserListChanged(this.userProfiles);
        });
    }

    getUsername(): string {
        return this.username;
    }

    getCachedUserProfiles() {
        return this.userProfiles;
    }

    clear(): void {
        this.userProfiles = [];
        this.currentPageNo = 1;
        this.username = null;
        this.notifyUserListCleared();
        this.notifyUserProfileDetailsChanged(null);
    }

    notifyUserListChanged(userList: UserProfile[]): void {
        this.userListChanged.next(userList);
    }

    notifyUserListCleared(): void {
        this.userListCleared.next();
    }

    notifyUserProfileDetailsChanged(userProfileDetails: UserProfileDetails): void {
        this.userProfileDetailsChanged.next(userProfileDetails);
    }
}