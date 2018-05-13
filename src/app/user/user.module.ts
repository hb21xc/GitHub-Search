import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { UserSearchFormComponent } from "./user-search-form/user-search-form.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UserProfileService } from "./services/user-profile.service";
import { GitHubService } from "./services/github.service";

@NgModule({
    declarations: [
        UserSearchFormComponent,
        UserListComponent,
        UserProfileComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers: [
        UserProfileService,
        GitHubService
    ],
    exports: [
        UserSearchFormComponent,
        UserListComponent,
        UserProfileComponent
    ]
})
export class UserModule { }