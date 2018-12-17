import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPrivacy } from 'app/shared/model/privacy.model';
import { PrivacyService } from './privacy.service';

@Component({
    selector: 'jhi-privacy-update',
    templateUrl: './privacy-update.component.html'
})
export class PrivacyUpdateComponent implements OnInit {
    privacy: IPrivacy;
    isSaving: boolean;

    constructor(private privacyService: PrivacyService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ privacy }) => {
            this.privacy = privacy;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.privacy.id !== undefined) {
            this.subscribeToSaveResponse(this.privacyService.update(this.privacy));
        } else {
            this.subscribeToSaveResponse(this.privacyService.create(this.privacy));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPrivacy>>) {
        result.subscribe((res: HttpResponse<IPrivacy>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
