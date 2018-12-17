export interface ICohort {
    id?: number;
    cohortId?: number;
    gradDate?: string;
}

export class Cohort implements ICohort {
    constructor(public id?: number, public gradDate?: string) {}
}
