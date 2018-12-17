import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICohort } from 'app/shared/model/cohort.model';
import { Principal } from 'app/core';
import { CohortService } from './cohort.service';

@Component({
    selector: 'jhi-cohort',
    templateUrl: './cohort.component.html'
})
export class CohortComponent implements OnInit, OnDestroy {
    cohorts: ICohort[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cohortService: CohortService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.cohortService.query().subscribe(
            (res: HttpResponse<ICohort[]>) => {
                this.cohorts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCohorts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICohort) {
        return item.id;
    }

    registerChangeInCohorts() {
        this.eventSubscriber = this.eventManager.subscribe('cohortListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
