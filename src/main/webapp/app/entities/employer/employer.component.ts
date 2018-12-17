import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEmployer } from 'app/shared/model/employer.model';
import { Principal } from 'app/core';
import { EmployerService } from './employer.service';

@Component({
    selector: 'jhi-employer',
    templateUrl: './employer.component.html'
})
export class EmployerComponent implements OnInit, OnDestroy {
    employers: IEmployer[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private employerService: EmployerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.employerService.query().subscribe(
            (res: HttpResponse<IEmployer[]>) => {
                this.employers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInEmployers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IEmployer) {
        return item.id;
    }

    registerChangeInEmployers() {
        this.eventSubscriber = this.eventManager.subscribe('employerListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
