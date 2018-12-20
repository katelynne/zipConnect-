/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UserProfileComponentsPage, UserProfileDeleteDialog, UserProfileUpdatePage } from './user-profile.page-object';

const expect = chai.expect;

describe('UserProfile e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let userProfileUpdatePage: UserProfileUpdatePage;
    let userProfileComponentsPage: UserProfileComponentsPage;
    let userProfileDeleteDialog: UserProfileDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load UserProfiles', async () => {
        await navBarPage.goToEntity('user-profile');
        userProfileComponentsPage = new UserProfileComponentsPage();
        expect(await userProfileComponentsPage.getTitle()).to.eq('zipConnectApp.userProfile.home.title');
    });

    it('should load create UserProfile page', async () => {
        await userProfileComponentsPage.clickOnCreateButton();
        userProfileUpdatePage = new UserProfileUpdatePage();
        expect(await userProfileUpdatePage.getPageTitle()).to.eq('zipConnectApp.userProfile.home.createOrEditLabel');
        await userProfileUpdatePage.cancel();
    });

    it('should create and save UserProfiles', async () => {
        const nbButtonsBeforeCreate = await userProfileComponentsPage.countDeleteButtons();

        await userProfileComponentsPage.clickOnCreateButton();
        await promise.all([
            userProfileUpdatePage.setFirstNameInput('firstName'),
            userProfileUpdatePage.setLastNameInput('lastName'),
            userProfileUpdatePage.setUserStackInput('userStack'),
            userProfileUpdatePage.userSelectLastOption(),
            userProfileUpdatePage.employerSelectLastOption(),
            userProfileUpdatePage.cohortSelectLastOption()
        ]);
        expect(await userProfileUpdatePage.getFirstNameInput()).to.eq('firstName');
        expect(await userProfileUpdatePage.getLastNameInput()).to.eq('lastName');
        expect(await userProfileUpdatePage.getUserStackInput()).to.eq('userStack');
        await userProfileUpdatePage.save();
        expect(await userProfileUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await userProfileComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last UserProfile', async () => {
        const nbButtonsBeforeDelete = await userProfileComponentsPage.countDeleteButtons();
        await userProfileComponentsPage.clickOnLastDeleteButton();

        userProfileDeleteDialog = new UserProfileDeleteDialog();
        expect(await userProfileDeleteDialog.getDialogTitle()).to.eq('zipConnectApp.userProfile.delete.question');
        await userProfileDeleteDialog.clickOnConfirmButton();

        expect(await userProfileComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
