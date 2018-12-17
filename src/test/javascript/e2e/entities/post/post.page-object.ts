import { element, by, ElementFinder } from 'protractor';

export class PostComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-post div table .btn-danger'));
    title = element.all(by.css('jhi-post div h2#page-heading span')).first();

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

export class PostUpdatePage {
    pageTitle = element(by.id('jhi-post-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    postIdInput = element(by.id('field_postId'));
    timestampInput = element(by.id('field_timestamp'));
    contentInput = element(by.id('field_content'));
    likesInput = element(by.id('field_likes'));
    posterSelect = element(by.id('field_poster'));
    privacySettingSelect = element(by.id('field_privacySetting'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setPostIdInput(postId) {
        await this.postIdInput.sendKeys(postId);
    }

    async getPostIdInput() {
        return this.postIdInput.getAttribute('value');
    }

    async setTimestampInput(timestamp) {
        await this.timestampInput.sendKeys(timestamp);
    }

    async getTimestampInput() {
        return this.timestampInput.getAttribute('value');
    }

    async setContentInput(content) {
        await this.contentInput.sendKeys(content);
    }

    async getContentInput() {
        return this.contentInput.getAttribute('value');
    }

    async setLikesInput(likes) {
        await this.likesInput.sendKeys(likes);
    }

    async getLikesInput() {
        return this.likesInput.getAttribute('value');
    }

    async posterSelectLastOption() {
        await this.posterSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async privacySettingSelectLastOption() {
        await this.privacySettingSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async privacySettingSelectOption(option) {
        await this.privacySettingSelect.sendKeys(option);
    }

    getPrivacySettingSelect(): ElementFinder {
        return this.privacySettingSelect;
    }

    async getPrivacySettingSelectedOption() {
        return this.privacySettingSelect.element(by.css('option:checked')).getText();
    }

    async posterSelectOption(option) {
        await this.posterSelect.sendKeys(option);
    }

    getPosterSelect(): ElementFinder {
        return this.posterSelect;
    }

    async getPosterSelectedOption() {
        return this.posterSelect.element(by.css('option:checked')).getText();
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

export class PostDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-post-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-post'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
