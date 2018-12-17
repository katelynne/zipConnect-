import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Employer } from 'app/shared/model/employer.model';
import { EmployerService } from './employer.service';
import { EmployerComponent } from './employer.component';
import { EmployerDetailComponent } from './employer-detail.component';
import { EmployerUpdateComponent } from './employer-update.component';
import { EmployerDeletePopupComponent } from './employer-delete-dialog.component';
import { IEmployer } from 'app/shared/model/employer.model';

@Injectable({ providedIn: 'root' })
export class EmployerResolve implements Resolve<IEmployer> {
    constructor(private service: EmployerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employer> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Employer>) => response.ok),
                map((employer: HttpResponse<Employer>) => employer.body)
            );
        }
        return of(new Employer());
    }
}

export const employerRoute: Routes = [
    {
        path: 'employer',
        component: EmployerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipConnectApp.employer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'employer/:id/view',
        component: EmployerDetailComponent,
        resolve: {
            employer: EmployerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipConnectApp.employer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'employer/new',
        component: EmployerUpdateComponent,
        resolve: {
            employer: EmployerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipConnectApp.employer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'employer/:id/edit',
        component: EmployerUpdateComponent,
        resolve: {
            employer: EmployerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipConnectApp.employer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const employerPopupRoute: Routes = [
    {
        path: 'employer/:id/delete',
        component: EmployerDeletePopupComponent,
        resolve: {
            employer: EmployerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'zipConnectApp.employer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
