import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICohort } from 'app/shared/model/cohort.model';

type EntityResponseType = HttpResponse<ICohort>;
type EntityArrayResponseType = HttpResponse<ICohort[]>;

@Injectable({ providedIn: 'root' })
export class CohortService {
    public resourceUrl = SERVER_API_URL + 'api/cohorts';

    constructor(private http: HttpClient) {}

    create(cohort: ICohort): Observable<EntityResponseType> {
        return this.http.post<ICohort>(this.resourceUrl, cohort, { observe: 'response' });
    }

    update(cohort: ICohort): Observable<EntityResponseType> {
        return this.http.put<ICohort>(this.resourceUrl, cohort, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ICohort>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ICohort[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
