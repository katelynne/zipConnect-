/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ZipConnectTestModule } from '../../../test.module';
import { CohortComponent } from 'app/entities/cohort/cohort.component';
import { CohortService } from 'app/entities/cohort/cohort.service';
import { Cohort } from 'app/shared/model/cohort.model';

describe('Component Tests', () => {
    describe('Cohort Management Component', () => {
        let comp: CohortComponent;
        let fixture: ComponentFixture<CohortComponent>;
        let service: CohortService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ZipConnectTestModule],
                declarations: [CohortComponent],
                providers: []
            })
                .overrideTemplate(CohortComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CohortComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CohortService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Cohort(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.cohorts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
