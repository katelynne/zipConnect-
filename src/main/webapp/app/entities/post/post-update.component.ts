import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IPost } from 'app/shared/model/post.model';
import { PostService } from './post.service';
import { IUser, UserService } from 'app/core';
import { IPrivacy } from 'app/shared/model/privacy.model';
import { PrivacyService } from 'app/entities/privacy';

@Component({
    selector: 'jhi-post-update',
    templateUrl: './post-update.component.html'
})
export class PostUpdateComponent implements OnInit {
    post: IPost;
    isSaving: boolean;

    users: IUser[];

    privacysettings: IPrivacy[];
    timestampDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private postService: PostService,
        private userService: UserService,
        private privacyService: PrivacyService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ post }) => {
            this.post = post;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.privacyService.query({ filter: 'post-is-null' }).subscribe(
            (res: HttpResponse<IPrivacy[]>) => {
                if (!this.post.privacySetting || !this.post.privacySetting.id) {
                    this.privacysettings = res.body;
                } else {
                    this.privacyService.find(this.post.privacySetting.id).subscribe(
                        (subRes: HttpResponse<IPrivacy>) => {
                            this.privacysettings = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.post.id !== undefined) {
            this.subscribeToSaveResponse(this.postService.update(this.post));
        } else {
            this.subscribeToSaveResponse(this.postService.create(this.post));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPost>>) {
        result.subscribe((res: HttpResponse<IPost>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPrivacyById(index: number, item: IPrivacy) {
        return item.id;
    }
}
