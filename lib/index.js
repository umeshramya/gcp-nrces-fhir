"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncounterClassArray = exports.EncounterStatusArray = exports.EncounterHospitalizationDischargeDispositionArray = exports.EncounterResource = exports.OrganizationResource = exports.PractitionerResource = exports.PatientResource = exports.resourceTypeArray = exports.GcpFhirSearch = exports.GcpFhirCRUD = void 0;
const gcp_1 = __importDefault(require("./classess/gcp"));
exports.GcpFhirCRUD = gcp_1.default;
const gcpSearch_1 = __importDefault(require("./classess/gcpSearch"));
exports.GcpFhirSearch = gcpSearch_1.default;
const Patient_1 = require("./resources/Patient");
Object.defineProperty(exports, "PatientResource", { enumerable: true, get: function () { return Patient_1.PatientResource; } });
const Practitioner_1 = require("./resources/Practitioner");
Object.defineProperty(exports, "PractitionerResource", { enumerable: true, get: function () { return Practitioner_1.PractitionerResource; } });
const Organization_1 = require("./resources/Organization");
Object.defineProperty(exports, "OrganizationResource", { enumerable: true, get: function () { return Organization_1.OrganizationResource; } });
const Encounter_1 = require("./resources/Encounter");
Object.defineProperty(exports, "EncounterResource", { enumerable: true, get: function () { return Encounter_1.EncounterResource; } });
Object.defineProperty(exports, "EncounterHospitalizationDischargeDispositionArray", { enumerable: true, get: function () { return Encounter_1.EncounterHospitalizationDischargeDispositionArray; } });
Object.defineProperty(exports, "EncounterStatusArray", { enumerable: true, get: function () { return Encounter_1.EncounterStatusArray; } });
Object.defineProperty(exports, "EncounterClassArray", { enumerable: true, get: function () { return Encounter_1.EncounterClassArray; } });
const config_1 = require("./config");
Object.defineProperty(exports, "resourceTypeArray", { enumerable: true, get: function () { return config_1.resourceTypeArray; } });
//# sourceMappingURL=index.js.map