import { element, by, ElementFinder } from 'protractor';

export class PrivacyComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-privacy div table .btn-danger'));
    title = element.all(by.css('jhi-privacy div h2#page-heading span')).first();

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

export class PrivacyUpdatePage {
    pageTitle = element(by.id('jhi-privacy-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    publicViewInput = element(by.id('field_publicView'));
    cohortViewInput = element(by.id('field_cohortView'));
    employerViewInput = element(by.id('field_employerView'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    getPublicViewInput() {
        return this.publicViewInput;
    }
    getCohortViewInput() {
        return this.cohortViewInput;
    }
    getEmployerViewInput() {
        return this.employerViewInput;
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

export class PrivacyDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-privacy-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-privacy'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
