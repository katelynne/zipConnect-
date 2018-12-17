/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PrivacyComponentsPage, PrivacyDeleteDialog, PrivacyUpdatePage } from './privacy.page-object';

const expect = chai.expect;

describe('Privacy e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let privacyUpdatePage: PrivacyUpdatePage;
    let privacyComponentsPage: PrivacyComponentsPage;
    let privacyDeleteDialog: PrivacyDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Privacies', async () => {
        await navBarPage.goToEntity('privacy');
        privacyComponentsPage = new PrivacyComponentsPage();
        expect(await privacyComponentsPage.getTitle()).to.eq('zipConnectApp.privacy.home.title');
    });

    it('should load create Privacy page', async () => {
        await privacyComponentsPage.clickOnCreateButton();
        privacyUpdatePage = new PrivacyUpdatePage();
        expect(await privacyUpdatePage.getPageTitle()).to.eq('zipConnectApp.privacy.home.createOrEditLabel');
        await privacyUpdatePage.cancel();
    });

    it('should create and save Privacies', async () => {
        const nbButtonsBeforeCreate = await privacyComponentsPage.countDeleteButtons();

        await privacyComponentsPage.clickOnCreateButton();
        await promise.all([privacyUpdatePage.setPrivacyIdInput('5')]);
        expect(await privacyUpdatePage.getPrivacyIdInput()).to.eq('5');
        const selectedPublicView = privacyUpdatePage.getPublicViewInput();
        if (await selectedPublicView.isSelected()) {
            await privacyUpdatePage.getPublicViewInput().click();
            expect(await privacyUpdatePage.getPublicViewInput().isSelected()).to.be.false;
        } else {
            await privacyUpdatePage.getPublicViewInput().click();
            expect(await privacyUpdatePage.getPublicViewInput().isSelected()).to.be.true;
        }
        const selectedCohortView = privacyUpdatePage.getCohortViewInput();
        if (await selectedCohortView.isSelected()) {
            await privacyUpdatePage.getCohortViewInput().click();
            expect(await privacyUpdatePage.getCohortViewInput().isSelected()).to.be.false;
        } else {
            await privacyUpdatePage.getCohortViewInput().click();
            expect(await privacyUpdatePage.getCohortViewInput().isSelected()).to.be.true;
        }
        const selectedEmployerView = privacyUpdatePage.getEmployerViewInput();
        if (await selectedEmployerView.isSelected()) {
            await privacyUpdatePage.getEmployerViewInput().click();
            expect(await privacyUpdatePage.getEmployerViewInput().isSelected()).to.be.false;
        } else {
            await privacyUpdatePage.getEmployerViewInput().click();
            expect(await privacyUpdatePage.getEmployerViewInput().isSelected()).to.be.true;
        }
        await privacyUpdatePage.save();
        expect(await privacyUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await privacyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Privacy', async () => {
        const nbButtonsBeforeDelete = await privacyComponentsPage.countDeleteButtons();
        await privacyComponentsPage.clickOnLastDeleteButton();

        privacyDeleteDialog = new PrivacyDeleteDialog();
        expect(await privacyDeleteDialog.getDialogTitle()).to.eq('zipConnectApp.privacy.delete.question');
        await privacyDeleteDialog.clickOnConfirmButton();

        expect(await privacyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
