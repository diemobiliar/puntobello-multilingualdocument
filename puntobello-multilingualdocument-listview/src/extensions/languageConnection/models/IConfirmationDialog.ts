export interface IConfirmationDialog {
    onClose: () => void;
    isOpen: boolean;
    Title: string;
    Message: string;
    OkBtnLabel: string;
}
