## [1.1.6](https://github.com/WYRE-AI/node-it-glue/compare/v1.1.5...v1.1.6) (2026-09-04)


### Bug Fixes

* **release:** restore persist-credentials:false, re-auth only for release ops ([#74](https://github.com/WYRE-AI/node-it-glue/issues/74)) ([7934460](https://github.com/WYRE-AI/node-it-glue/commit/79344603a6ea6a201a00edc893d06f162007eb60))
* **security:** resolve dependabot alerts via npm audit fix ([#71](https://github.com/WYRE-AI/node-it-glue/issues/71)) ([67e72e0](https://github.com/WYRE-AI/node-it-glue/commit/67e72e039f39b9359c383b839f9ec6bb1dbb92b9))


## [1.1.5](https://github.com/WYRE-AI/node-it-glue/compare/v1.1.4...v1.1.5) (2026-08-25)


### Bug Fixes

* **deps:** ignore undici in dependabot -- nested unreachable copy in npm's bundled tree ([#66](https://github.com/WYRE-AI/node-it-glue/issues/66)) ([99168a4](https://github.com/WYRE-AI/node-it-glue/commit/99168a43818aae005ab4f8ab74edc569e2c7c1b1))
* migrate to WYRE-AI org (npm scope, ghcr namespace, registry) ([#68](https://github.com/WYRE-AI/node-it-glue/issues/68)) ([fe783e0](https://github.com/WYRE-AI/node-it-glue/commit/fe783e0072c9d36057e2e4feef70d9fafdd71144))

## [1.1.4](https://github.com/wyre-technology/node-it-glue/compare/v1.1.3...v1.1.4) (2026-08-11)


### Bug Fixes

* **http:** throw instead of returning undefined when deserialized data is empty ([#59](https://github.com/wyre-technology/node-it-glue/issues/59)) ([e3dc02a](https://github.com/wyre-technology/node-it-glue/commit/e3dc02a782413d93827f5de8ecfe32d33db44630)), closes [wyre-technology/halopsa-mcp#76](https://github.com/wyre-technology/halopsa-mcp/issues/76)

## [1.1.3](https://github.com/wyre-technology/node-it-glue/compare/v1.1.2...v1.1.3) (2026-08-06)


### Bug Fixes

* **deps:** ignore unreachable ip-address advisory in dependabot config ([#57](https://github.com/wyre-technology/node-it-glue/issues/57)) ([dd2fff3](https://github.com/wyre-technology/node-it-glue/commit/dd2fff32eb8b46dc1b3222dcffe48343ce59adb7))

## [1.1.2](https://github.com/wyre-technology/node-it-glue/compare/v1.1.1...v1.1.2) (2026-06-22)


### Bug Fixes

* **tsconfig:** restore include/exclude globs ([#34](https://github.com/wyre-technology/node-it-glue/issues/34)) ([2f1f86e](https://github.com/wyre-technology/node-it-glue/commit/2f1f86ebb5802d43be3f46a5841cf1716eb4d293))

## [1.1.1](https://github.com/wyre-technology/node-it-glue/compare/v1.1.0...v1.1.1) (2026-05-26)


### Bug Fixes

* correct packaging exports map, add lint + CI, bump deps ([#3](https://github.com/wyre-technology/node-it-glue/issues/3)) ([0b413ff](https://github.com/wyre-technology/node-it-glue/commit/0b413ffe44bce5ada135a4fa39ec5eadc04068d5))

# [1.1.0](https://github.com/wyre-technology/node-it-glue/compare/v1.0.1...v1.1.0) (2026-03-25)


### Features

* **types:** add documentFolderId to DocumentFilter ([5dc282d](https://github.com/wyre-technology/node-it-glue/commit/5dc282d1b1ca0cb6035d8d02f82cc3d927676311))

## [1.0.1](https://github.com/wyre-technology/node-it-glue/compare/v1.0.0...v1.0.1) (2026-03-02)


### Bug Fixes

* require Node 22+ (semantic-release@25 compatibility) ([cfd8ae0](https://github.com/wyre-technology/node-it-glue/commit/cfd8ae0885cd5f10de2fe4d5f0ca67c5debb36f6))
* require Node 22+ (semantic-release@25 compatibility) ([28a390b](https://github.com/wyre-technology/node-it-glue/commit/28a390beec0fc7f95c500ff5f3f9b8f909994730))

# 1.0.0 (2026-02-05)


### Bug Fixes

* Add semantic-release plugins as devDependencies ([e6c7712](https://github.com/asachs01/node-it-glue/commit/e6c771231d30e2bb4b8d7d57bfea61708c573146))


### Features

* Implement remaining resource classes for full API coverage ([238bb51](https://github.com/asachs01/node-it-glue/commit/238bb517f48cd313a1d2189cf2353e751972d0e9))
* Initial project setup with core infrastructure ([75c1acf](https://github.com/asachs01/node-it-glue/commit/75c1acf160d75362f9e4ded1fc4a098aa81f010e))

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- CI workflow (`.github/workflows/ci.yml`) running install, lint, typecheck, build and tests on pull requests and pushes (Node 22).

### Changed

- Bumped `undici` 7 -> 8, `semantic-release` 24 -> 25 and `@semantic-release/github` 11 -> 12.
- Applied `npm audit fix` for non-breaking advisories (PostCSS, Vite, picomatch).

### Security

- One moderate advisory remains in `brace-expansion`, bundled inside the `npm` package (a transitive dependency of `semantic-release`). It is not reachable at runtime and cannot be resolved without a forced, potentially breaking `semantic-release` change.

## [0.1.0] - 2026-02-04

### Added

- Initial release of node-it-glue library with full API coverage
- Core infrastructure:
  - `ITGlueClient` main client class with 27 resource properties
  - HTTP client with fetch wrapper and automatic retries
  - JSON:API serialization/deserialization with kebab-to-camel case conversion
  - Rate limiting (3000 req / 5 min) with throttling and exponential backoff
  - Automatic pagination with async iterators and helper methods (toArray, take)
  - Regional support (US, EU, AU)
- Error handling:
  - `ITGlueError` base error class
  - `ITGlueAuthenticationError` for 401/403 responses
  - `ITGlueNotFoundError` for 404 responses
  - `ITGlueValidationError` for 422 responses with error details
  - `ITGlueRateLimitError` for 429 responses
  - `ITGlueServerError` for 5xx responses
  - `ITGlueNetworkError` for network-level errors
  - `ITGlueTimeoutError` for request timeouts
- Complete resource implementations:
  - Organizations (list, listAll, get, create, update, delete)
  - Organization Types (list, listAll, get, create, update)
  - Organization Statuses (list, listAll, get, create, update)
  - Configurations (list, listAll, listByOrg, listAllByOrg, get, create, update, delete)
  - Configuration Types (list, listAll, get, create, update, delete)
  - Configuration Statuses (list, listAll, get, create, update, delete)
  - Configuration Interfaces (listByConfig, create, update, delete)
  - Contacts (list, listAll, listByOrg, listAllByOrg, get, create, update, delete)
  - Contact Types (list, listAll, get, create, update)
  - Documents (list, listAll, listByOrg, listAllByOrg, get, create, update, delete, publish)
  - Document Sections (listByDoc, create, update, delete)
  - Document Images (list, create, delete)
  - Passwords (list, listAll, listByOrg, listAllByOrg, get, create, update, delete) with showPassword support
  - Password Categories (list, listAll, get, create, update, delete)
  - Password Folders (listByOrg, create, update, delete)
  - Flexible Asset Types (list, listAll, get, create, update, delete)
  - Flexible Asset Fields (listByType, create, update, delete)
  - Flexible Assets (list, listAll, get, create, update, delete)
  - Locations (listByOrg, create, update, delete)
  - Users (list, listAll, get, update, bulkUpdate) - read-only creation
  - User Metrics (list, listAll)
  - Groups (list, listAll, get, create, update, delete)
  - Manufacturers (list, listAll, get, create, update)
  - Models (listByManufacturer, create, update)
  - Platforms (list) - read-only
  - Operating Systems (list) - read-only
  - Countries (list, listAll, get) - read-only
  - Regions (listByCountry) - read-only
  - Domains (listByOrg) - read-only
  - Expirations (list, listAll, get) - read-only
  - Logs (list, listAll) - read-only
  - Attachments (list, create, update, delete) - nested under various resource types
  - Related Items (create, update, delete)
  - Exports (list, listAll, get, create, delete)
  - Checklists (listByOrg, get, update, delete)
- Full TypeScript type definitions for all resources
- Test infrastructure:
  - Vitest configuration
  - MSW for API mocking
  - 113 tests covering unit and integration scenarios
- Dual build output (ESM and CommonJS)
