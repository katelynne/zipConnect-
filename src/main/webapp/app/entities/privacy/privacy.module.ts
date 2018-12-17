import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ZipConnectSharedModule } from 'app/shared';
import {
    PrivacyComponent,
    PrivacyDetailComponent,
    PrivacyUpdateComponent,
    PrivacyDeletePopupComponent,
    PrivacyDeleteDialogComponent,
    privacyRoute,
    privacyPopupRoute
} from './';

const ENTITY_STATES = [...privacyRoute, ...privacyPopupRoute];

@NgModule({
    imports: [ZipConnectSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PrivacyComponent,
        PrivacyDetailComponent,
        PrivacyUpdateComponent,
        PrivacyDeleteDialogComponent,
        PrivacyDeletePopupComponent
    ],
    entryComponents: [PrivacyComponent, PrivacyUpdateComponent, PrivacyDeleteDialogComponent, PrivacyDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ZipConnectPrivacyModule {}
