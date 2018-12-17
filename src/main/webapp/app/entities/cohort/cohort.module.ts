import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ZipConnectSharedModule } from 'app/shared';
import {
    CohortComponent,
    CohortDetailComponent,
    CohortUpdateComponent,
    CohortDeletePopupComponent,
    CohortDeleteDialogComponent,
    cohortRoute,
    cohortPopupRoute
} from './';

const ENTITY_STATES = [...cohortRoute, ...cohortPopupRoute];

@NgModule({
    imports: [ZipConnectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [CohortComponent, CohortDetailComponent, CohortUpdateComponent, CohortDeleteDialogComponent, CohortDeletePopupComponent],
    entryComponents: [CohortComponent, CohortUpdateComponent, CohortDeleteDialogComponent, CohortDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ZipConnectCohortModule {}
