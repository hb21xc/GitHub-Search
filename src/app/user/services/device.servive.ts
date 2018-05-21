import { Injectable } from "@angular/core";

@Injectable()
export class DeviceService {

    // TODO import https://github.com/maciej-gurban/responsive-bootstrap-toolkit
    isSmartphone() {
        return window.innerWidth < 576;
    }
}