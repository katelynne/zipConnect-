/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EmployerComponentsPage, EmployerDeleteDialog, EmployerUpdatePage } from './employer.page-object';

const expect = chai.expect;

describe('Employer e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let employerUpdatePage: EmployerUpdatePage;
    let employerComponentsPage: EmployerComponentsPage;
    let employerDeleteDialog: EmployerDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Employers', async () => {
        await navBarPage.goToEntity('employer');
        employerComponentsPage = new EmployerComponentsPage();
        expect(await employerComponentsPage.getTitle()).to.eq('zipConnectApp.employer.home.title');
    });

    it('should load create Employer page', async () => {
        await employerComponentsPage.clickOnCreateButton();
        employerUpdatePage = new EmployerUpdatePage();
        expect(await employerUpdatePage.getPageTitle()).to.eq('zipConnectApp.employer.home.createOrEditLabel');
        await employerUpdatePage.cancel();
    });

    it('should create and save Employers', async () => {
        const nbButtonsBeforeCreate = await employerComponentsPage.countDeleteButtons();

        await employerComponentsPage.clickOnCreateButton();
        await promise.all([
            employerUpdatePage.setEmployerIdInput('5'),
            employerUpdatePage.setCompanyNameInput('companyName'),
            employerUpdatePage.setCityInput('city'),
            employerUpdatePage.setStateInput('state')
        ]);
        expect(await employerUpdatePage.getEmployerIdInput()).to.eq('5');
        expect(await employerUpdatePage.getCompanyNameInput()).to.eq('companyName');
        expect(await employerUpdatePage.getCityInput()).to.eq('city');
        expect(await employerUpdatePage.getStateInput()).to.eq('state');
        await employerUpdatePage.save();
        expect(await employerUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await employerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Employer', async () => {
        const nbButtonsBeforeDelete = await employerComponentsPage.countDeleteButtons();
        await employerComponentsPage.clickOnLastDeleteButton();

        employerDeleteDialog = new EmployerDeleteDialog();
        expect(await employerDeleteDialog.getDialogTitle()).to.eq('zipConnectApp.employer.delete.question');
        await employerDeleteDialog.clickOnConfirmButton();

        expect(await employerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
