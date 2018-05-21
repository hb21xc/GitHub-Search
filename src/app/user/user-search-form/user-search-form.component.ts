import { Component } from "@angular/core";
import { FormGroup, NgForm, FormControl } from "@angular/forms";

import { UserProfileService } from "../services/user-profile.service";

@Component({
    selector: "user-search-form",
    templateUrl: "./user-search-form.component.html",
    styles: ["user-search-form.component.css"]
})
export class UserSearchFormComponent {

    constructor(private userProfileService: UserProfileService) { }

    onSearch(username: string): void {
        this.userProfileService.searchByUsername(username);
    }

    onClear(username: FormControl): void {
        username.setValue("");
        this.userProfileService.clear();
    }
}