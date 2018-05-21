import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { UserSearchFormComponent } from "./user-search-form/user-search-form.component";
import { UserListSplitViewComponent } from "./user-list-split-view/user-list-split-view.component";
import { UserListComponent } from "./user-list/user-list.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UserProfileService } from "./services/user-profile.service";
import { GitHubService } from "./services/github.service";
import { DeviceService } from "./services/device.servive";

@NgModule({
    declarations: [
        UserSearchFormComponent,
        UserListSplitViewComponent,
        UserListComponent,
        UserProfileComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        InfiniteScrollModule
    ],
    providers: [
        UserProfileService,
        GitHubService,
        DeviceService
    ],
    exports: [
        UserSearchFormComponent,
        UserListSplitViewComponent,
        UserListComponent,
        UserProfileComponent
    ]
})
export class UserModule { }