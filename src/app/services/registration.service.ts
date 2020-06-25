import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import RegistrationModel from "../model/RegistrationModel";

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {

    public static readonly REGISTER_URL = '/api/register';

    constructor(private httpClient: HttpClient) {
    }

    checkForLogin(login: string): Observable<any> {
        return this.httpClient.get(`${RegistrationService.REGISTER_URL}/login/${login}`);
    }

    checkForUsername(username: string): Observable<any> {
        return this.httpClient.get(`${RegistrationService.REGISTER_URL}/username/${username}`);
    }

    checkForEmail(email: string): Observable<any> {
        return this.httpClient.get(`${RegistrationService.REGISTER_URL}/email/${email}`);
    }

    registerUser(user: RegistrationModel): Observable<any> {
        return this.httpClient.post(RegistrationService.REGISTER_URL, user);
    }

}
