# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `gcp-nrces-fhir` - a TypeScript library for interacting with Google Cloud Healthcare API's FHIR resources, specifically designed for India's National Resource Centre for EHR Standards (NRCES) FHIR implementation. The library provides comprehensive FHIR resource implementations with NRCES-specific extensions and terminology.

## Development Environment Setup

### Prerequisites
- Node.js (version compatible with TypeScript 4.7.3)
- Google Cloud Platform account with Healthcare API enabled
- Service account credentials for GCP FHIR store access

### Environment Variables
Required environment variables (set in `.env` file for development):
```
GCP_FHIR_type=service_account
GCP_FHIR_project_id=<your-project-id>
GCP_FHIR_private_key_id=<your-private-key-id>
GCP_FHIR_private_key="-----BEGIN PRIVATE KEY-----...-----END PRIVATE KEY-----\n"
GCP_FHIR_client_email=<service-account-email>
GCP_FHIR_client_id=<client-id>
GCP_FHIR_auth_uri=https://accounts.google.com/o/oauth2/auth
GCP_FHIR_token_uri=https://oauth2.googleapis.com/token
GCP_FHIR_auth_provider_x509_cert_url=https://www.googleapis.com/oauth2/v1/certs
GCP_FHIR_client_x509_cert_url=<cert-url>

GCP_FHIR_cloudRegion=<region>
GCP_FHIR_projectId=<project-id>
GCP_FHIR_datasetId=<dataset-id>
GCP_FHIR_fhirStoreId=<fhir-store-id>
```

## Development Commands

### Build and Test Workflow
The primary development workflow uses `yalc` for local package testing:

```bash
# Build TypeScript and publish locally
npm run dev

# This runs the full workflow:
# 1. tsc - Compile TypeScript to ./lib
# 2. yalc publish - Publish package locally
# 3. cd test && yalc add gcp-nrces-fhir - Link test project
# 4. yalc update gcp-nrces-fhir - Update test project
# 5. node index - Run test script
```

### Manual Build Steps
```bash
# Compile TypeScript
tsc

# Publish locally with yalc
yalc publish

# In test directory: link and update
cd test
yalc add gcp-nrces-fhir
yalc update gcp-nrces-fhir
node index.js
```

## Architecture Overview

### Core Components

1. **GcpFhirCRUD** (`src/classess/gcp.ts`): Main class for CRUD operations on Google Cloud FHIR store
   - Handles create, read, update, delete operations
   - Uses Google Healthcare API client (`@googleapis/healthcare`)
   - Loads credentials from environment variables

2. **GcpFhirSearch** (`src/classess/gcpSearch.ts`): Search functionality for FHIR resources
   - Supports complex FHIR search queries
   - Handles includes and revincludes
   - Custom search parameter support

3. **ResourceFactory** (`src/classess/ResourceFactory.ts`): Factory pattern for creating FHIR resources
   - Creates resource instances based on type
   - Converts between FHIR JSON and internal objects

4. **ResourceMaster Interface** (`src/Interfaces/index.ts`): Base interface for all FHIR resources
   - Defines `getFHIR()` and `convertFhirToObject()` methods
   - Ensures consistent API across all resources

### Directory Structure

```
src/
├── classess/           # Core classes (gcp.ts, gcpSearch.ts, ResourceFactory.ts, ReseorcetToHtml.ts)
├── config/            # Configuration (credentials, database paths, resource types)
├── hcx/               # Healthcare exchange resources (Claim, Coverage, Task, etc.)
│   └── bundle/        # HCX bundle implementations
├── Interfaces/        # TypeScript interfaces
├── resources/         # FHIR resource implementations
│   ├── Bundle/        # Bundle resource types (Prescription, DiagnosticReport, etc.)
│   ├── Composition/   # Composition resources (OPConsultRecord, PrescriptionRecord, etc.)
│   └── objects/       # Supporting objects (Actor, Participant)
├── TimeZone/          # Time zone utilities
└── index.ts           # Main export file
```

### FHIR Resource Implementation Pattern

Each FHIR resource follows this pattern:
```typescript
class ResourceName {
  getFHIR(data: object): fhir.Resource  // Convert internal object to FHIR JSON
  convertFhirToObject(fhirData: fhir.Resource): object  // Convert FHIR JSON to internal object
  // Resource-specific methods
}
```

### Bundle Resources
Specialized bundle implementations for clinical documents:
- `PrescriptionBundle`: Prescription documents with PDF generation
- `OPConsultationBundle`: Outpatient consultation records
- `DiagnosticReportBundle`: Diagnostic report bundles
- `DischargeSummaryBundle`: Discharge summary documents
- `HealthDocumentBundle`: General health documents

### HCX (Healthcare Exchange) Resources
Implementation of India's Healthcare Exchange standards:
- `Claim`, `ClaimResponse`: Insurance claim processing
- `Coverage`, `CoverageEligibilityRequest`: Insurance coverage
- `Task`: Workflow tasks
- `Communication`: Healthcare communications

## Testing Strategy

### Test Environment
- Separate `/test` directory with its own `package.json`
- Uses `yalc` to link to the main package locally
- Contains example implementations and test data
- End-to-end tests in `/test/end-to-end/`

### Running Tests
```bash
cd test
node index.js  # Run main test script
node end-to-end/medication.js  # Run specific end-to-end test
```

### Test Data
- Sample FHIR resources in `/test/testData/`
- Example JSON files for various resource types
- CSV to FHIR conversion examples

## Build Configuration

### TypeScript (`tsconfig.json`)
- Target: ES2015
- Module: CommonJS
- Strict mode enabled
- Declaration files generated (.d.ts)
- Source maps enabled
- Root: `./src`, Output: `./lib`

### Package Configuration
- Main entry: `lib/index.js`
- Files included: `lib/**/*` (compiled TypeScript output)
- Dependencies: `@googleapis/healthcare`, `date-age`, `html-to-text`, `js-ts-report`, `uuid`

## Key Design Patterns

1. **Factory Pattern**: `ResourceFactory` creates FHIR resource instances
2. **Repository Pattern**: `GcpFhirCRUD` provides data access abstraction
3. **Builder Pattern**: Resource classes with fluent interfaces for complex objects
4. **Strategy Pattern**: Different implementations for various FHIR resource types
5. **Adapter Pattern**: Conversion between internal objects and FHIR JSON

## Common Development Tasks

### Adding a New FHIR Resource
1. Create new file in `src/resources/` (e.g., `NewResource.ts`)
2. Implement the `ResourceMaster` interface
3. Add `getFHIR()` and `convertFhirToObject()` methods
4. Export from `src/index.ts`
5. Add test examples in `/test/`

### Modifying Existing Resources
1. Update the resource class in `src/resources/`
2. Ensure backward compatibility in `getFHIR()` and `convertFhirToObject()`
3. Update TypeScript interfaces if needed
4. Test with existing test data

### Debugging GCP API Issues
1. Check environment variables are set correctly
2. Verify GCP credentials have Healthcare API permissions
3. Use `console.log()` in test scripts to inspect API responses
4. Check GCP Cloud Logging for API errors

## Git Workflow

- Main branches: `main`, `dev`, `test`
- Development typically happens on `dev` branch
- Test changes in `/test` directory before committing
- Use descriptive commit messages referencing FHIR resources or features

## Important Notes

- The library uses NRCES-specific extensions and terminology codes
- All dates should use ISO 8601 format with timezone information
- Resource IDs are UUIDs (v4) generated using the `uuid` package
- PDF generation uses `js-ts-report` for clinical document rendering
- HCX resources follow India's Healthcare Exchange specifications

## Configuration Files

- `src/config/index.ts`: Central configuration loading
- `src/config/practionerRole.ts`: Practitioner role mappings
- Environment variables override default configuration

## Breaking Changes and Upgrade History

### Google Healthcare API v26 Upgrade (2026-03-05)
**Version**: 11.01.26 → 11.1.26

**Issue**: Google Healthcare API v26 introduced breaking changes where FHIR operations return `Blob` objects instead of parsed JSON. The `buffer-equal-constant-time` dependency also caused Node.js v25 compatibility issues.

**Changes in `src/classess/gcp.ts`**:
- All CRUD methods (`createFhirResource`, `getFhirResource`, `updateFhirResource`, `deleteFhirResource`, `deleteAllFhirResource`, `excuteBundle`) now handle Blob-to-JSON conversion
- Added `responseType: 'json'` to request configuration
- Pattern used for Blob handling:
  ```typescript
  let data = response.data;
  if (data && typeof data.text === 'function') {
    data = JSON.parse(await data.text());
  }
  response.data = data; return response;
  ```

**Updated Dependencies**:
- `@googleapis/healthcare`: v3.10.0 → v26.0.0
- `uuid`: v8.3.2 → v13.0.0
- `html-to-text`: v8.2.1 → v9.0.5
- `@types/node`: v16.11.26 → v25.3.3
- Test environment synchronized with main package versions

**Reference**: See `CHANGELOG.md` for detailed migration notes and complete change history.

### Google Healthcare API v26 Search Fix (2026-03-06)
**Version**: 11.1.26 → 12.0.0

**Issue**: Search operations in `GcpFhirSearch` class were not handling API v26's `Blob` response format, causing production issues.

**Changes in `src/classess/gcpSearch.ts`**:
- `searchFhirResourcesGet()` method now converts Blob responses to JSON
- `search()` method now converts Blob responses to JSON
- Both methods use the same Blob-to-JSON conversion pattern as CRUD operations:
  ```typescript
  let data = response.data;
  if (data && typeof data.text === 'function') {
    data = JSON.parse(await data.text());
  }
  response.data = data; return response;
  ```

**Impact**: All search operations now return parsed JSON responses matching the format of version 3.x API while maintaining v26 compatibility.

**Reference**: See `CHANGELOG.md` for complete change history.

## Error Handling

- GCP API errors are thrown as exceptions
- Resource validation errors provide descriptive messages
- Missing required fields throw validation errors
- Network/timeout errors should be retried with exponential backoff