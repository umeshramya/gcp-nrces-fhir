# Changelog

All notable changes to the `gcp-nrces-fhir` project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [11.1.26] - 2026-03-05

### Fixed
- **BREAKING CHANGE**: Updated `@googleapis/healthcare` from v3.10.0 to v26.0.0 to fix Node.js v25.8.0 compatibility
- Fixed `buffer-equal-constant-time` error: `SlowBuffer.prototype.equal` undefined in Node.js v25
- Fixed Blob response handling in GCP FHIR API v26 (returns Blob objects instead of JSON)
- Fixed package version format from `11.01.26` to `11.1.26` (invalid semantic version)

### Changed
- **GcpFhirCRUD class** (`src/classess/gcp.ts`): All CRUD methods now handle Blob-to-JSON conversion
  - `createFhirResource()`: Added `responseType: 'json'` and Blob parsing
  - `getFhirResource()`: Added Blob parsing for read operations
  - `updateFhirResource()`: Added Blob parsing for update operations
  - `deleteFhirResource()`: Added Blob parsing for delete operations
  - `deleteAllFhirResource()`: Added Blob parsing for bulk delete
  - `excuteBundle()`: Added Blob parsing for bundle execution
- **Dependency updates**:
  - `uuid`: v8.3.2 → v13.0.0
  - `html-to-text`: v8.2.1 → v9.0.5
  - `@types/node`: v16.11.26 → v25.3.3 (Node.js 25 compatibility)
  - `@types/uuid`: v8.3.3 → v11.0.0
  - Test project: `js-ts-report` v5.0.27 → v6.3.0 (sync with main)
  - Test project: `uuid` v8.3.2 → v13.0.0 (sync with main)

### Technical Details

#### Google Healthcare API v26 Breaking Changes
The Google Healthcare API v26 introduced a breaking change where FHIR operations return `Blob` objects instead of parsed JSON. The fix involves:

```typescript
// Before (v3.10.0):
const resource = await this.healthcare.projects.locations.datasets.fhirStores.fhir.create(request);
return resource; // response.data contains parsed JSON

// After (v26.0.0):
const response = await this.healthcare.projects.locations.datasets.fhirStores.fhir.create(request);
let data = response.data;
if (data && typeof data.text === 'function') {
  data = JSON.parse(await data.text()); // Convert Blob to JSON
}
response.data = data; return response;
```

#### Blob Detection Pattern
All CRUD methods now use this pattern to safely handle both Blob and direct JSON responses:

```typescript
let data = response.data;
if (data && typeof data.text === 'function') {
  data = JSON.parse(await data.text());
}
response.data = data; return response;
```

#### Node.js v25 Compatibility
The `buffer-equal-constant-time` package (dependency of `jwa` → `jws` → `google-auth-library`) had compatibility issues with Node.js v25.8.0 due to `SlowBuffer` API changes. Upgrading to Google Healthcare API v26 resolves this by using updated authentication libraries.

### Migration Notes
- **Node.js Version**: Compatible with Node.js v25.8.0+ (tested)
- **API Response Format**: All FHIR operations now return parsed JSON in `response.data`
- **Backward Compatibility**: The Blob handling works with both old and new API versions
- **Test Environment**: Ensure test project dependencies match main project versions

### Files Modified
- `src/classess/gcp.ts` - Core Blob handling fixes
- `package.json` - Updated dependencies and version
- `test/package.json` - Synchronized test dependencies
- `CLAUDE.md` - Added project documentation for new contributors

### Known Issues
- **Security Vulnerabilities**: Some transitive dependencies have known vulnerabilities (run `npm audit` for details)
- **Deprecated Packages**: Some dependencies show deprecation warnings but remain functional

### Future Considerations
- Consider adding automated tests for Blob response handling
- Monitor Google Healthcare API changelog for future breaking changes
- Consider migrating to TypeScript imports (`import` vs `require`) for better type safety

---

## Previous Versions

### [11.01.26] - Initial version before breaking changes
- Original working version with Google Healthcare API v3.10.0
- Compatible with older Node.js versions (tested with Node.js < v25)
- Direct JSON responses from GCP FHIR API