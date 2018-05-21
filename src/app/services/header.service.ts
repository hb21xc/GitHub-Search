import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class HeaderService {
    private titleChanged: Subject<string>;
    titleChanged$: Observable<string>;

    constructor() {
        this.titleChanged = new Subject<string>();
        this.titleChanged$ = this.titleChanged.asObservable();
    }

    setTitle(title: string): void {
        this.titleChanged.next(title);
    }
}