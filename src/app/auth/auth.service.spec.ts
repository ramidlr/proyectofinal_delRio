import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { AuthService } from "./auth.service"
import { User } from "../features/dashboard/pages/users/models/model"
import { MockProvider } from 'ng-mocks'
import { Router } from "@angular/router"


describe('AuthService', () => {
    let service: AuthService;
    let httpController: HttpTestingController;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
                MockProvider(Router)
            ]
        });

        service = TestBed.inject(AuthService);
        httpController = TestBed.inject(HttpTestingController);
    })

    it('Si login es valido, el Obs authuser$ debe emitir un valor.', (done) => {

        //mock de respuesta de la peticion http.
        const mockUser: User = {
            id: 1,
            email: 'fake@email.com',
            name: 'Rami',
            surname: 'Surname',
            password: 'lknaslfkKK2',
            token: '1rjn1jnr2orinjnqkrwjn',
            dni: '36169523',
            course: 'Angular'
        }

        const mockResponse: User[] = [mockUser]

        service.login({
            email: mockUser.email,
            password: mockUser.password
        });
        httpController.expectOne({
            method: 'GET',
            url: 'http://localhost:3000/users?email=fake@email.com&password=lknaslfkKK2'
        }).flush(mockResponse)

        service.authUser$.subscribe({
            next: (authUser) => {
                expect(authUser).toBeTruthy();
                expect(authUser).toEqual(mockUser);
                done();
            }
        })
    })

})