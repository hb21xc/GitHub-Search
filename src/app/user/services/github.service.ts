import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { UserProfile } from "../interfaces/user-profile.interface";
import { UserProfileDetails } from "../interfaces/user-profile-details.interface";
import { Observable } from "rxjs/Observable";

@Injectable()
export class GitHubService {
    private searchUrl = "https://api.github.com/search/users?q=<username>";
    private profileUrl = "https://api.github.com/users/<username>"

    constructor(private httpClient: HttpClient) { }

    searchByUsername(username: string): Observable<UserProfile[]> {
        const url = this.searchUrl.replace("<username>", username);
        return this.httpClient.get<UserProfile[]>(url);
    }

    getUserProfile(username: string): Observable<UserProfileDetails> {
        const url = this.profileUrl.replace("<username>", username);
        return this.httpClient.get<UserProfileDetails>(url);
    }
}