import { IUser } from 'app/core/user/user.model';
import { ICohort } from 'app/shared/model//cohort.model';
import { IEmployer } from 'app/shared/model//employer.model';

export interface IUserProfile {
    id?: number;
    profileId?: number;
    firstName?: string;
    lastName?: string;
    userStack?: string;
    user?: IUser;
    cohort?: ICohort;
    employer?: IEmployer;
    employer?: IEmployer;
    cohort?: ICohort;
}

export class UserProfile implements IUserProfile {
    constructor(
        public id?: number,
        public profileId?: number,
        public firstName?: string,
        public lastName?: string,
        public userStack?: string,
        public user?: IUser,
        public cohort?: ICohort,
        public employer?: IEmployer,
        public employer?: IEmployer,
        public cohort?: ICohort
    ) {}
}
