/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ZipConnectTestModule } from '../../../test.module';
import { CohortDeleteDialogComponent } from 'app/entities/cohort/cohort-delete-dialog.component';
import { CohortService } from 'app/entities/cohort/cohort.service';

describe('Component Tests', () => {
    describe('Cohort Management Delete Component', () => {
        let comp: CohortDeleteDialogComponent;
        let fixture: ComponentFixture<CohortDeleteDialogComponent>;
        let service: CohortService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ZipConnectTestModule],
                declarations: [CohortDeleteDialogComponent]
            })
                .overrideTemplate(CohortDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CohortDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CohortService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
