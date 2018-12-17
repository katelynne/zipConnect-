import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IUserProfile } from 'app/shared/model/user-profile.model';
import { UserProfileService } from './user-profile.service';
import { IUser, UserService } from 'app/core';
import { ICohort } from 'app/shared/model/cohort.model';
import { CohortService } from 'app/entities/cohort';
import { IEmployer } from 'app/shared/model/employer.model';
import { EmployerService } from 'app/entities/employer';

@Component({
    selector: 'jhi-user-profile-update',
    templateUrl: './user-profile-update.component.html'
})
export class UserProfileUpdateComponent implements OnInit {
    userProfile: IUserProfile;
    isSaving: boolean;

    users: IUser[];

    cohorts: ICohort[];

    employers: IEmployer[];

    employers: IEmployer[];

    cohorts: ICohort[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private userProfileService: UserProfileService,
        private userService: UserService,
        private cohortService: CohortService,
        private employerService: EmployerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userProfile }) => {
            this.userProfile = userProfile;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.cohortService.query({ filter: 'userprofile-is-null' }).subscribe(
            (res: HttpResponse<ICohort[]>) => {
                if (!this.userProfile.cohort || !this.userProfile.cohort.id) {
                    this.cohorts = res.body;
                } else {
                    this.cohortService.find(this.userProfile.cohort.id).subscribe(
                        (subRes: HttpResponse<ICohort>) => {
                            this.cohorts = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.employerService.query({ filter: 'userprofile-is-null' }).subscribe(
            (res: HttpResponse<IEmployer[]>) => {
                if (!this.userProfile.employer || !this.userProfile.employer.id) {
                    this.employers = res.body;
                } else {
                    this.employerService.find(this.userProfile.employer.id).subscribe(
                        (subRes: HttpResponse<IEmployer>) => {
                            this.employers = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.employerService.query().subscribe(
            (res: HttpResponse<IEmployer[]>) => {
                this.employers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.cohortService.query().subscribe(
            (res: HttpResponse<ICohort[]>) => {
                this.cohorts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.userProfile.id !== undefined) {
            this.subscribeToSaveResponse(this.userProfileService.update(this.userProfile));
        } else {
            this.subscribeToSaveResponse(this.userProfileService.create(this.userProfile));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUserProfile>>) {
        result.subscribe((res: HttpResponse<IUserProfile>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackCohortById(index: number, item: ICohort) {
        return item.id;
    }

    trackEmployerById(index: number, item: IEmployer) {
        return item.id;
    }
}
