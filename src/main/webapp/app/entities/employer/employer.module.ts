import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ZipConnectSharedModule } from 'app/shared';
import {
    EmployerComponent,
    EmployerDetailComponent,
    EmployerUpdateComponent,
    EmployerDeletePopupComponent,
    EmployerDeleteDialogComponent,
    employerRoute,
    employerPopupRoute
} from './';

const ENTITY_STATES = [...employerRoute, ...employerPopupRoute];

@NgModule({
    imports: [ZipConnectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EmployerComponent,
        EmployerDetailComponent,
        EmployerUpdateComponent,
        EmployerDeleteDialogComponent,
        EmployerDeletePopupComponent
    ],
    entryComponents: [EmployerComponent, EmployerUpdateComponent, EmployerDeleteDialogComponent, EmployerDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ZipConnectEmployerModule {}
