/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ZipConnectTestModule } from '../../../test.module';
import { CohortDetailComponent } from 'app/entities/cohort/cohort-detail.component';
import { Cohort } from 'app/shared/model/cohort.model';

describe('Component Tests', () => {
    describe('Cohort Management Detail Component', () => {
        let comp: CohortDetailComponent;
        let fixture: ComponentFixture<CohortDetailComponent>;
        const route = ({ data: of({ cohort: new Cohort(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ZipConnectTestModule],
                declarations: [CohortDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CohortDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CohortDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cohort).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
