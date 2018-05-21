import { Component, OnInit, OnDestroy } from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { HeaderService } from "../../services/header.service";
import { RouterService } from "../../services/router.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styles: ["header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
    private titleChangeSubscription: Subscription;
    isBackButtonShown: boolean = false;
    title: string;

    constructor(private headerService: HeaderService, private routerService: RouterService) { }

    ngOnInit() {
        this.registerTitleChangeSubscription();
    }

    ngOnDestroy() {
        this.titleChangeSubscription.unsubscribe();
    }

    registerTitleChangeSubscription(): void {
        this.titleChangeSubscription = this.headerService.titleChanged$
            .subscribe((title) => {
                this.title = title
                this.showBackButton(this.routerService.canGoBack());
            });
    }

    showBackButton(value: boolean): void {
        this.isBackButtonShown = value;
    }

    onBackButtonClicked(): void {
        this.routerService.goBack()
    }
}