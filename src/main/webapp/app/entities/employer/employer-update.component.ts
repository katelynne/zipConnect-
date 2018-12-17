import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEmployer } from 'app/shared/model/employer.model';
import { EmployerService } from './employer.service';

@Component({
    selector: 'jhi-employer-update',
    templateUrl: './employer-update.component.html'
})
export class EmployerUpdateComponent implements OnInit {
    employer: IEmployer;
    isSaving: boolean;

    constructor(private employerService: EmployerService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ employer }) => {
            this.employer = employer;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.employer.id !== undefined) {
            this.subscribeToSaveResponse(this.employerService.update(this.employer));
        } else {
            this.subscribeToSaveResponse(this.employerService.create(this.employer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEmployer>>) {
        result.subscribe((res: HttpResponse<IEmployer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
