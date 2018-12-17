import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Cohort } from 'app/shared/model/cohort.model';
import { CohortService } from './cohort.service';
import { CohortComponent } from './cohort.component';
import { CohortDetailComponent } from './cohort-detail.component';
import { CohortUpdateComponent } from './cohort-update.component';
import { CohortDeletePopupComponent } from './cohort-delete-dialog.component';
import { ICohort } from 'app/shared/model/cohort.model';

@Injectable({ providedIn: 'root' })
export class CohortResolve implements Resolve<ICohort> {
    constructor(private service: CohortService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cohort> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Cohort>) => response.ok),
                map((cohort: HttpResponse<Cohort>) => cohort.body)
            );
        }
        return of(new Cohort());
    }
}

export const cohortRoute: Routes = [
    {
        path: 'cohort',
        component: CohortComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipConnectApp.cohort.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cohort/:id/view',
        component: CohortDetailComponent,
        resolve: {
            cohort: CohortResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipConnectApp.cohort.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cohort/new',
        component: CohortUpdateComponent,
        resolve: {
            cohort: CohortResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipConnectApp.cohort.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'cohort/:id/edit',
        component: CohortUpdateComponent,
        resolve: {
            cohort: CohortResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipConnectApp.cohort.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cohortPopupRoute: Routes = [
    {
        path: 'cohort/:id/delete',
        component: CohortDeletePopupComponent,
        resolve: {
            cohort: CohortResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipConnectApp.cohort.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
