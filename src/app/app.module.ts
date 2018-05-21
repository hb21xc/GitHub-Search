import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { UserModule } from "./user/user.module";
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from "./app-routing.module";
import { HeaderService } from "./services/header.service";
import { RouterService } from "./services/router.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    UserModule
  ],
  providers: [
    HeaderService,
    RouterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }