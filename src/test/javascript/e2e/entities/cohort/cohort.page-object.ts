import { element, by, ElementFinder } from 'protractor';

export class CohortComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-cohort div table .btn-danger'));
    title = element.all(by.css('jhi-cohort div h2#page-heading span')).first();

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

export class CohortUpdatePage {
    pageTitle = element(by.id('jhi-cohort-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    gradDateInput = element(by.id('field_gradDate'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setGradDateInput(gradDate) {
        await this.gradDateInput.sendKeys(gradDate);
    }

    async getGradDateInput() {
        return this.gradDateInput.getAttribute('value');
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

export class CohortDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-cohort-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-cohort'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
