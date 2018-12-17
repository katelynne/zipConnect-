import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICohort } from 'app/shared/model/cohort.model';
import { CohortService } from './cohort.service';

@Component({
    selector: 'jhi-cohort-update',
    templateUrl: './cohort-update.component.html'
})
export class CohortUpdateComponent implements OnInit {
    cohort: ICohort;
    isSaving: boolean;

    constructor(private cohortService: CohortService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cohort }) => {
            this.cohort = cohort;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cohort.id !== undefined) {
            this.subscribeToSaveResponse(this.cohortService.update(this.cohort));
        } else {
            this.subscribeToSaveResponse(this.cohortService.create(this.cohort));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICohort>>) {
        result.subscribe((res: HttpResponse<ICohort>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
