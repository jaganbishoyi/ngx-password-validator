
# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [v3.0.0] - 2022-07-10

This release contains performance improvement. And new template option added.

### Added

- Template option added ( 'inline', 'popup' ).
- Now users can add option as `template: 'inline'`.
- Default option is `template: 'popup'`.

### Changed

- Now users only able to pass options using [NgPasswordValidator]="options" to minimize complexity.
- All other inputs removed from Directive.

### Fixed

- If we are not passing password options, it is throwing errors.
