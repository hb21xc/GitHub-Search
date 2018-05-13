import { Injectable } from "@angular/core";

import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

import { GitHubService } from "./github.service";
import { UserProfile } from "../interfaces/user-profile.interface";
import { UserProfileDetails } from "../interfaces/user-profile-details.interface";

@Injectable()
export class UserProfileService {
    private userListChanged: Subject<UserProfile[]>;
    private userProfileChanged: Subject<UserProfileDetails>;
    userList$: Observable<UserProfile[]>;
    userProfile$: Observable<UserProfileDetails>;

    constructor(private gitHubSerive: GitHubService) { 
        this.userListChanged = new Subject<UserProfile[]>();
        this.userProfileChanged = new Subject<UserProfileDetails>();
        this.userList$ = this.userListChanged.asObservable();
        this.userProfile$ = this.userProfileChanged.asObservable();
    }

    searchByUsername(username: string): void {
        this.gitHubSerive.searchByUsername(username).subscribe((userList: any) => {
            this.notifyUserListChanged(userList.items);
        });
    }

    getUserProfile(username: string): void {
        this.gitHubSerive.getUserProfile(username).subscribe((userProfile: UserProfileDetails) => {
            this.notifyUserProfileChanged(userProfile);
        });
    }

    notifyUserListChanged(userList: UserProfile[]): void {
        this.userListChanged.next(userList);
    }

    notifyUserProfileChanged(userProfile: UserProfileDetails): void {
        this.userProfileChanged.next(userProfile);
    }
}