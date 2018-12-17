import { element, by, ElementFinder } from 'protractor';

export class UserProfileComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-user-profile div table .btn-danger'));
    title = element.all(by.css('jhi-user-profile div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class UserProfileUpdatePage {
    pageTitle = element(by.id('jhi-user-profile-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    profileIdInput = element(by.id('field_profileId'));
    firstNameInput = element(by.id('field_firstName'));
    lastNameInput = element(by.id('field_lastName'));
    userStackInput = element(by.id('field_userStack'));
    userSelect = element(by.id('field_user'));
    cohortSelect = element(by.id('field_cohort'));
    employerSelect = element(by.id('field_employer'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setProfileIdInput(profileId) {
        await this.profileIdInput.sendKeys(profileId);
    }

    async getProfileIdInput() {
        return this.profileIdInput.getAttribute('value');
    }

    async setFirstNameInput(firstName) {
        await this.firstNameInput.sendKeys(firstName);
    }

    async getFirstNameInput() {
        return this.firstNameInput.getAttribute('value');
    }

    async setLastNameInput(lastName) {
        await this.lastNameInput.sendKeys(lastName);
    }

    async getLastNameInput() {
        return this.lastNameInput.getAttribute('value');
    }

    async setUserStackInput(userStack) {
        await this.userStackInput.sendKeys(userStack);
    }

    async getUserStackInput() {
        return this.userStackInput.getAttribute('value');
    }

    async userSelectLastOption() {
        await this.userSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async userSelectOption(option) {
        await this.userSelect.sendKeys(option);
    }

    getUserSelect(): ElementFinder {
        return this.userSelect;
    }

    async getUserSelectedOption() {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    async employerSelectLastOption() {
        await this.employerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async employerSelectOption(option) {
        await this.employerSelect.sendKeys(option);
    }

    getEmployerSelect(): ElementFinder {
        return this.employerSelect;
    }

    async getEmployerSelectedOption() {
        return this.employerSelect.element(by.css('option:checked')).getText();
    }

    async cohortSelectLastOption() {
        await this.cohortSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async cohortSelectOption(option) {
        await this.cohortSelect.sendKeys(option);
    }

    getCohortSelect(): ElementFinder {
        return this.cohortSelect;
    }

    async getCohortSelectedOption() {
        return this.cohortSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class UserProfileDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-userProfile-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-userProfile'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
