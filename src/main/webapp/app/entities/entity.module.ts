import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ZipConnectUserProfileModule } from './user-profile/user-profile.module';
import { ZipConnectCohortModule } from './cohort/cohort.module';
import { ZipConnectEmployerModule } from './employer/employer.module';
import { ZipConnectPostModule } from './post/post.module';
import { ZipConnectPrivacyModule } from './privacy/privacy.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        ZipConnectUserProfileModule,
        ZipConnectCohortModule,
        ZipConnectEmployerModule,
        ZipConnectPostModule,
        ZipConnectPrivacyModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ZipConnectEntityModule {}
