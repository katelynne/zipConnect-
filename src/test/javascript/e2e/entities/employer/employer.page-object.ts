import { element, by, ElementFinder } from 'protractor';

export class EmployerComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-employer div table .btn-danger'));
    title = element.all(by.css('jhi-employer div h2#page-heading span')).first();

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

export class EmployerUpdatePage {
    pageTitle = element(by.id('jhi-employer-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    companyNameInput = element(by.id('field_companyName'));
    cityInput = element(by.id('field_city'));
    stateInput = element(by.id('field_state'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setCompanyNameInput(companyName) {
        await this.companyNameInput.sendKeys(companyName);
    }

    async getCompanyNameInput() {
        return this.companyNameInput.getAttribute('value');
    }

    async setCityInput(city) {
        await this.cityInput.sendKeys(city);
    }

    async getCityInput() {
        return this.cityInput.getAttribute('value');
    }

    async setStateInput(state) {
        await this.stateInput.sendKeys(state);
    }

    async getStateInput() {
        return this.stateInput.getAttribute('value');
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

export class EmployerDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-employer-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-employer'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
