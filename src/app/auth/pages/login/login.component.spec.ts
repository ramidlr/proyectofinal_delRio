import { TestBed, TestComponentRenderer } from "@angular/core/testing"
import { LoginComponent } from "./login.component"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from "../../auth.service";

describe('LoginComponent', () => {
    let component: LoginComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [MatFormFieldModule, MatInputModule, HttpClientTestingModule]
        })
        component = TestBed.createComponent(LoginComponent).componentInstance
    })

    it('El formulario es invalido si los campos estan vacios', () => {
        component.emailControl.setValue('');
        component.passwordControl.setValue('');

        expect(component.loginForm.invalid).toBeTrue();
    })

    it('Si al hacer login, el form es invalid, debe dispararse el metodo markAllAsTouched de la propiedad del loginForm.',
        () => {
            component.emailControl.setValue('');
            component.passwordControl.setValue('');
            expect(component.loginForm.invalid).toBeTrue();

            const spyOfMarkAllAsTouched = spyOn(component.loginForm, 'markAllAsTouched');
            component.login();
            expect(spyOfMarkAllAsTouched).toHaveBeenCalled();
        })

    it('Al llamar login(), y el form es valido, debe haberse llamado el metodo login del AuthService', () => {
        const authService = TestBed.inject(AuthService);
        component.emailControl.setValue('email@mail.com');
        component.passwordControl.setValue('Blacskunaq2!');
        expect(component.loginForm.valid).toBeTrue();
        const spyOnAuthServiceLogin = spyOn(authService, 'login');
        component.login();
        expect(spyOnAuthServiceLogin).toHaveBeenCalled();

    })


})
