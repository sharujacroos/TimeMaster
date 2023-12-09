
const slNICRegExp = /^(?:19|20)?\d{2}[0-9]{10}|[0-9]{9}[x|X|v|V]$/;
let contacNum = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
export function validateConfirmationDialog(values) {
    let errors = {};
    if (!values.reason) {
        errors.reason = 'Reason is required';
    }

    return errors;
}

export function validateConfirmationDialogNoValidation(values) {
    let errors = {};

    return errors;
}

export function validateLogin(values) {
    let errors = {};

    if (!values.username) {
        errors.username = 'Username is is Required';
    }
    if (!values.password) {
        errors.password = "Password is Required"
    }
    return errors;
}

export function validateTask(values) {
    console.log(values)
    let errors = {};

    if (!values.taskName) {
        errors.taskName = "Task Name is Required"
    }
    if (!values.category) {
        errors.category = "Category is Required"
    }
    if (!values.startDate) {
        errors.startDate = "Start Date is Required"
    }
    if (!values.startTime) {
        errors.startTime = "Start Time is Required"
    }
    if (!values.endDate) {
        errors.endDate = "End Date is Required"
    }
    if (!values.endTime) {
        errors.endTime = "End Time is Required"
    }
    if (!values.description) {
        errors.description = "Description is Required"
    }

    return errors;
}

export function validateEvent(values) {
    console.log(values)
    let errors = {};

    if (!values.title) {
        errors.title = "Title is Required"
    }
    if (!values.start) {
        errors.start = "Start Date is Required"
    }
    if (!values.end) {
        errors.end = "End Date is Required"
    }

    return errors;
}

