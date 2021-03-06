import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmployer } from 'app/shared/model/employer.model';

type EntityResponseType = HttpResponse<IEmployer>;
type EntityArrayResponseType = HttpResponse<IEmployer[]>;

@Injectable({ providedIn: 'root' })
export class EmployerService {
    public resourceUrl = SERVER_API_URL + 'api/employers';

    constructor(private http: HttpClient) {}

    create(employer: IEmployer): Observable<EntityResponseType> {
        return this.http.post<IEmployer>(this.resourceUrl, employer, { observe: 'response' });
    }

    update(employer: IEmployer): Observable<EntityResponseType> {
        return this.http.put<IEmployer>(this.resourceUrl, employer, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IEmployer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IEmployer[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
