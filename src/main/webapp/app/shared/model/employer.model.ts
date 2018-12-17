export interface IEmployer {
    id?: number;
    employerId?: number;
    companyName?: string;
    city?: string;
    state?: string;
}

export class Employer implements IEmployer {
    constructor(public id?: number, public employerId?: number, public companyName?: string, public city?: string, public state?: string) {}
}
