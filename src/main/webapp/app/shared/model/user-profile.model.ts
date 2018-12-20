import { IUser } from 'app/core/user/user.model';
import { IEmployer } from 'app/shared/model//employer.model';
import { ICohort } from 'app/shared/model//cohort.model';

export interface IUserProfile {
    id?: number;
    firstName?: string;
    lastName?: string;
    userStack?: string;
    user?: IUser;
    employer?: IEmployer;
    cohort?: ICohort;
}

export class UserProfile implements IUserProfile {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public userStack?: string,
        public user?: IUser,
        public employer?: IEmployer,
        public cohort?: ICohort
    ) {}
}
