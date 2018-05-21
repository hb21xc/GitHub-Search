import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { UserProfile } from "../interfaces/user-profile.interface";
import { UserProfileDetails } from "../interfaces/user-profile-details.interface";

@Injectable()
export class GitHubService {
    private searchUrl = "https://api.github.com/search/users?per_page=40&page=<pageNo>&q=<username>";
    private profileUrl = "https://api.github.com/users/<username>"

    constructor(private httpClient: HttpClient) { }

    getUserProfiles(username: string, pageNo: number = 1): Observable<UserProfile[]> {
        const url = this.searchUrl
            .replace("<pageNo>", pageNo.toString())
            .replace("<username>", username);
        return this.httpClient.get<UserProfile[]>(url);
    }

    getUserProfileDetails(username: string): Observable<UserProfileDetails> {
        const url = this.profileUrl.replace("<username>", username);
        return this.httpClient.get<UserProfileDetails>(url);
    }
}