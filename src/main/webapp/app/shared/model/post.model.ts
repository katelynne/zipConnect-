import { Moment } from 'moment';
import { IUserProfile } from 'app/shared/model//user-profile.model';
import { IPrivacy } from 'app/shared/model//privacy.model';

export interface IPost {
    id?: number;
    timestamp?: Moment;
    content?: string;
    likes?: string;
    poster?: IUserProfile;
    privacySetting?: IPrivacy;
}

export class Post implements IPost {
    constructor(
        public id?: number,
        public timestamp?: Moment,
        public content?: string,
        public likes?: string,
        public poster?: IUserProfile,
        public privacySetting?: IPrivacy
    ) {}
}
