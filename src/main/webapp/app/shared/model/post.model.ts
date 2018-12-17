import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IPrivacy } from 'app/shared/model//privacy.model';

export interface IPost {
    id?: number;
    postId?: number;
    timestamp?: Moment;
    content?: string;
    likes?: string;
    poster?: IUser;
    privacySetting?: IPrivacy;
    poster?: IUser;
}

export class Post implements IPost {
    constructor(
        public id?: number,
        public postId?: number,
        public timestamp?: Moment,
        public content?: string,
        public likes?: string,
        public poster?: IUser,
        public privacySetting?: IPrivacy,
        public poster?: IUser
    ) {}
}
