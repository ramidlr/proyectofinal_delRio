import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-inscriptions',
    templateUrl: './inscriptions.component.html',
    styles: [],
})
export class InscriptionsComponent {
    displayedColumns = ['id', 'student', 'course']
    constructor() { }
}