import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HeaderComponent } from "./header/header.component";
import { ContentComponent } from "./content/content.component";
import { AppRoutingModule } from "../app-routing.module";

@NgModule({
    declarations: [
        HeaderComponent,
        ContentComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    exports: [
        HeaderComponent,
        ContentComponent
    ]
})
export class CoreModule { }