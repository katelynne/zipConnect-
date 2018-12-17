import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICohort } from 'app/shared/model/cohort.model';

@Component({
    selector: 'jhi-cohort-detail',
    templateUrl: './cohort-detail.component.html'
})
export class CohortDetailComponent implements OnInit {
    cohort: ICohort;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ cohort }) => {
            this.cohort = cohort;
        });
    }

    previousState() {
        window.history.back();
    }
}
