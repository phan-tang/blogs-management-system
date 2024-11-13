interface FormFieldItem {
    label: string;
    type: string;
    key: string;
}

export interface FormItem {
    fields: FormFieldItem[];
    displayType?: string;
    buttonText: string;
}