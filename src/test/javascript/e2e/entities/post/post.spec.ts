/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PostComponentsPage, PostDeleteDialog, PostUpdatePage } from './post.page-object';

const expect = chai.expect;

describe('Post e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let postUpdatePage: PostUpdatePage;
    let postComponentsPage: PostComponentsPage;
    let postDeleteDialog: PostDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Posts', async () => {
        await navBarPage.goToEntity('post');
        postComponentsPage = new PostComponentsPage();
        expect(await postComponentsPage.getTitle()).to.eq('zipConnectApp.post.home.title');
    });

    it('should load create Post page', async () => {
        await postComponentsPage.clickOnCreateButton();
        postUpdatePage = new PostUpdatePage();
        expect(await postUpdatePage.getPageTitle()).to.eq('zipConnectApp.post.home.createOrEditLabel');
        await postUpdatePage.cancel();
    });

    it('should create and save Posts', async () => {
        const nbButtonsBeforeCreate = await postComponentsPage.countDeleteButtons();

        await postComponentsPage.clickOnCreateButton();
        await promise.all([
            postUpdatePage.setTimestampInput('2000-12-31'),
            postUpdatePage.setContentInput('content'),
            postUpdatePage.setLikesInput('likes'),
            postUpdatePage.posterSelectLastOption(),
            postUpdatePage.privacySettingSelectLastOption()
        ]);
        expect(await postUpdatePage.getTimestampInput()).to.eq('2000-12-31');
        expect(await postUpdatePage.getContentInput()).to.eq('content');
        expect(await postUpdatePage.getLikesInput()).to.eq('likes');
        await postUpdatePage.save();
        expect(await postUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await postComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Post', async () => {
        const nbButtonsBeforeDelete = await postComponentsPage.countDeleteButtons();
        await postComponentsPage.clickOnLastDeleteButton();

        postDeleteDialog = new PostDeleteDialog();
        expect(await postDeleteDialog.getDialogTitle()).to.eq('zipConnectApp.post.delete.question');
        await postDeleteDialog.clickOnConfirmButton();

        expect(await postComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
