import { Component } from '@angular/core';
import { RegistrationService } from "../../services/registration.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import RegistrationModel from "../../model/RegistrationModel";
import { RegistrationValidator } from "../../validators/RegistrationValidator";
import ResponseModel from "../../model/ResponseModel";
import { ToastrService } from "ngx-toastr";
import { take } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.less']
})
export class RegistrationComponent {

    private static readonly PASSWORD_PATTERN = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{7,}';

    registrationForm: any;
    model: RegistrationModel;

    constructor(private registrationService: RegistrationService, private registrationValidator: RegistrationValidator, private formBuilder: FormBuilder, private toastrService: ToastrService, private router: Router) {
        this.model = new RegistrationModel();
        this.registrationForm = this.formBuilder.group({
            login: new FormControl(this.model.login, Validators.required, this.registrationValidator.checkLoginAvailability.bind(this.registrationValidator)),
            username: new FormControl(this.model.username, Validators.required, this.registrationValidator.checkUsernameAvailability.bind(this.registrationValidator)),
            email: new FormControl(this.model.email, [Validators.required, Validators.email], this.registrationValidator.checkEmailAvailability.bind(this.registrationValidator)),
            password: new FormControl(this.model.password, [Validators.required, Validators.pattern(RegistrationComponent.PASSWORD_PATTERN)]),
            repeatPassword: new FormControl(this.model.repeatPassword, Validators.required)
        });
    }

    onSubmit(user: RegistrationModel): void {
        this.registrationService.registerUser(user)
            .subscribe((response: ResponseModel<any>) => this.toastrService.success(response.message)
                                                             .onTap
                                                             .pipe(take(1))
                                                             .subscribe(() => this.router.navigate(['/'])));
    }

    submitDisabled(): boolean {
        return !(this.passwordsMatch() && this.registrationForm.valid)
    }

    showLabel(field: FormGroup): boolean {
        return field.value;
    }

    passwordsMatch(): boolean {
        return this.password.value && this.password.value === this.repeatPassword.value;
    }

    get login(): FormGroup {
        return this.registrationForm.get('login');
    }

    get username(): FormGroup {
        return this.registrationForm.get('username');
    }

    get email(): FormGroup {
        return this.registrationForm.get('email');
    }

    get password(): FormGroup {
        return this.registrationForm.get('password');
    }

    get repeatPassword(): FormGroup {
        return this.registrationForm.get('repeatPassword')
    }
}
