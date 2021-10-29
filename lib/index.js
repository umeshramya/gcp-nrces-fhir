"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationResource = exports.PractitionerResource = exports.PatientResource = exports.GcpFhirCRUD = void 0;
const gcp_1 = __importDefault(require("./classess/gcp"));
exports.GcpFhirCRUD = gcp_1.default;
const Patient_1 = require("./resources/Patient");
Object.defineProperty(exports, "PatientResource", { enumerable: true, get: function () { return Patient_1.PatientResource; } });
const Practitioner_1 = require("./resources/Practitioner");
Object.defineProperty(exports, "PractitionerResource", { enumerable: true, get: function () { return Practitioner_1.PractitionerResource; } });
const Organization_1 = require("./resources/Organization");
Object.defineProperty(exports, "OrganizationResource", { enumerable: true, get: function () { return Organization_1.OrganizationResource; } });
//# sourceMappingURL=index.js.map