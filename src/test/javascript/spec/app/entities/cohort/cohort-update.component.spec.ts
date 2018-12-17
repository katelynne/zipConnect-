/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ZipConnectTestModule } from '../../../test.module';
import { CohortUpdateComponent } from 'app/entities/cohort/cohort-update.component';
import { CohortService } from 'app/entities/cohort/cohort.service';
import { Cohort } from 'app/shared/model/cohort.model';

describe('Component Tests', () => {
    describe('Cohort Management Update Component', () => {
        let comp: CohortUpdateComponent;
        let fixture: ComponentFixture<CohortUpdateComponent>;
        let service: CohortService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ZipConnectTestModule],
                declarations: [CohortUpdateComponent]
            })
                .overrideTemplate(CohortUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CohortUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CohortService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Cohort(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.cohort = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Cohort();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.cohort = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
