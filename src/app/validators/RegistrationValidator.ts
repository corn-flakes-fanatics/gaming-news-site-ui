import { Injectable } from "@angular/core";
import { RegistrationService } from "../services/registration.service";
import { FormControl } from "@angular/forms";
import ResponseModel from "../model/ResponseModel";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RegistrationValidator {

    constructor(private registrationService: RegistrationService) {
    }

    checkLoginAvailability(control: FormControl): Promise<any> {
        return new Promise((resolve) => {
            this.resolveResponse(resolve, this.registrationService.checkForLogin(control.value));
        });
    }

    checkUsernameAvailability(control: FormControl): Promise<any> {
        return new Promise((resolve) => {
            this.resolveResponse(resolve, this.registrationService.checkForUsername(control.value));
        });
    }

    checkEmailAvailability(control: FormControl): Promise<any> {
        return new Promise((resolve) => {
            this.resolveResponse(resolve, this.registrationService.checkForEmail(control.value));
        });
    }

    resolveResponse(resolve: any, result: Observable<any>): void {
        result.subscribe((result: ResponseModel<any>) => {
            if ( JSON.parse(result.message) ) {
                resolve({'inUse': true});
            } else {
                resolve(null);
            }
        });
    }

}
