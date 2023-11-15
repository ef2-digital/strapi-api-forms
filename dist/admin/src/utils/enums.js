"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldActionsEnum = exports.FieldDirectionEnum = exports.FieldTypeEnum = exports.EmailDataMessageEnum = exports.HandlerTypeEnum = void 0;
var HandlerTypeEnum;
(function (HandlerTypeEnum) {
    HandlerTypeEnum["Notification"] = "notification";
    HandlerTypeEnum["Confirmation"] = "confirmation";
})(HandlerTypeEnum = exports.HandlerTypeEnum || (exports.HandlerTypeEnum = {}));
var EmailDataMessageEnum;
(function (EmailDataMessageEnum) {
    EmailDataMessageEnum["Default"] = "default";
    EmailDataMessageEnum["Custom"] = "custom";
})(EmailDataMessageEnum = exports.EmailDataMessageEnum || (exports.EmailDataMessageEnum = {}));
var FieldTypeEnum;
(function (FieldTypeEnum) {
    FieldTypeEnum["Text"] = "text";
    FieldTypeEnum["Checkbox"] = "checkbox";
    FieldTypeEnum["Radio"] = "radio";
    FieldTypeEnum["Textarea"] = "textarea";
    FieldTypeEnum["Email"] = "email";
    FieldTypeEnum["Number"] = "number";
    FieldTypeEnum["Select"] = "select";
})(FieldTypeEnum = exports.FieldTypeEnum || (exports.FieldTypeEnum = {}));
var FieldDirectionEnum;
(function (FieldDirectionEnum) {
    FieldDirectionEnum["Up"] = "up";
    FieldDirectionEnum["Down"] = "down";
})(FieldDirectionEnum = exports.FieldDirectionEnum || (exports.FieldDirectionEnum = {}));
var FieldActionsEnum;
(function (FieldActionsEnum) {
    FieldActionsEnum["Add"] = "add";
    FieldActionsEnum["Edit"] = "edit";
})(FieldActionsEnum = exports.FieldActionsEnum || (exports.FieldActionsEnum = {}));
