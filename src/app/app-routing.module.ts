import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

import { UserListPlitViewComponent } from "./user/user-list-split-view/user-list-split-view.component";
import { UserProfileComponent } from "./user/user-profile/user-profile.component";

const appRoutes: Routes = [
    { path: "", component: UserListPlitViewComponent },
    { path: "userList", component: UserListPlitViewComponent },
    { path: "userProfile", component: UserProfileComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }