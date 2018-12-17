export interface IPrivacy {
    id?: number;
    privacyId?: number;
    publicView?: boolean;
    cohortView?: boolean;
    employerView?: boolean;
}

export class Privacy implements IPrivacy {
    constructor(
        public id?: number,
        public privacyId?: number,
        public publicView?: boolean,
        public cohortView?: boolean,
        public employerView?: boolean
    ) {
        this.publicView = this.publicView || false;
        this.cohortView = this.cohortView || false;
        this.employerView = this.employerView || false;
    }
}
