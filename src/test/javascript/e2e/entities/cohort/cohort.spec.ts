/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CohortComponentsPage, CohortDeleteDialog, CohortUpdatePage } from './cohort.page-object';

const expect = chai.expect;

describe('Cohort e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let cohortUpdatePage: CohortUpdatePage;
    let cohortComponentsPage: CohortComponentsPage;
    let cohortDeleteDialog: CohortDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Cohorts', async () => {
        await navBarPage.goToEntity('cohort');
        cohortComponentsPage = new CohortComponentsPage();
        expect(await cohortComponentsPage.getTitle()).to.eq('zipConnectApp.cohort.home.title');
    });

    it('should load create Cohort page', async () => {
        await cohortComponentsPage.clickOnCreateButton();
        cohortUpdatePage = new CohortUpdatePage();
        expect(await cohortUpdatePage.getPageTitle()).to.eq('zipConnectApp.cohort.home.createOrEditLabel');
        await cohortUpdatePage.cancel();
    });

    it('should create and save Cohorts', async () => {
        const nbButtonsBeforeCreate = await cohortComponentsPage.countDeleteButtons();

        await cohortComponentsPage.clickOnCreateButton();
        await promise.all([cohortUpdatePage.setCohortIdInput('5'), cohortUpdatePage.setGradDateInput('gradDate')]);
        expect(await cohortUpdatePage.getCohortIdInput()).to.eq('5');
        expect(await cohortUpdatePage.getGradDateInput()).to.eq('gradDate');
        await cohortUpdatePage.save();
        expect(await cohortUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await cohortComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Cohort', async () => {
        const nbButtonsBeforeDelete = await cohortComponentsPage.countDeleteButtons();
        await cohortComponentsPage.clickOnLastDeleteButton();

        cohortDeleteDialog = new CohortDeleteDialog();
        expect(await cohortDeleteDialog.getDialogTitle()).to.eq('zipConnectApp.cohort.delete.question');
        await cohortDeleteDialog.clickOnConfirmButton();

        expect(await cohortComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
