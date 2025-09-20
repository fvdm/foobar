# GitHub Copilot Instructions for fvdm/foobar

## Repository Overview

This is a simple Node.js test repository used by Franklin for experimenting with GitHub features and settings. The repository contains a minimal JavaScript module with a basic export structure and comprehensive testing setup.

**Repository Details:**
- **Type**: Node.js module/library
- **Language**: JavaScript (ES6+, Node.js >=10.0.0)
- **Size**: Very small (~9 files in root, simple structure)
- **Purpose**: Testing repository for GitHub features
- **Main Export**: `index.js` exports an object with a `foo()` method that returns 'bar'

## Build and Development Commands

### Prerequisites
**ALWAYS run `npm install` before any other command.** This repository requires dependencies to be installed before testing or linting.

```bash
npm install
```

**Note**: Installation takes ~10-15 seconds and may show vulnerability warnings (these are normal for this test repository and do not require fixing).

### Available Commands

#### Testing
```bash
npm test
```
- **Purpose**: Runs the complete test suite including ESLint and coverage
- **Duration**: ~15-30 seconds
- **What it does**:
  1. Lists git commits since last release (shows git warnings - normal)
  2. Runs ESLint with `.eslintrc` configuration
  3. Executes tests using the `dotest` framework
  4. Generates coverage reports with Istanbul
  5. Requires 85% function coverage threshold

**Critical**: Tests will FAIL if function coverage drops below 85%. When adding new functions to `index.js`, you MUST add corresponding tests to `test.js`.

#### Linting
```bash
# Check for lint errors
npx eslint .

# Auto-fix lint errors (recommended)
npx eslint --fix .
```

**Important**: Use the local eslint binary (`npx eslint` or `./node_modules/.bin/eslint`) rather than global eslint. The global version (v9+) will fail due to config format changes.

#### Manual Testing
```bash
# Test the module directly
node -e "console.log(require('./index.js').foo())"
# Should output: bar
```

### Common Issues and Solutions

#### Without Dependencies
- **`npm test` fails**: "dotest: not found" - Run `npm install` first
- **`npx eslint .` fails**: Uses wrong ESLint version (v9) - Install dependencies first

#### ESLint Configuration Issues
- **Config errors**: This repo uses ESLint v7 with `.eslintrc` format
- **Comment placement errors**: ESLint enforces `lines-around-comment` rule - add blank line before comments
- **Auto-fixing**: Use `npx eslint --fix .` to automatically fix many style issues

#### Coverage Issues
- **Function coverage below 85%**: Add tests for any new functions in `test.js`
- **Uncovered lines**: Add test cases that exercise all code paths

## Project Structure and Architecture

### Root Files
```
├── README.md           # Basic project description
├── package.json        # Dependencies and scripts
├── package-lock.json   # Locked dependency versions
├── index.js           # Main module exports (entry point)
├── test.js            # Test suite using dotest framework
├── .eslintrc          # ESLint configuration (v7 format)
├── .gitignore         # Excludes node_modules, coverage, .nyc_output
└── empty/             # Test directory structure
```

### Key Files Detail

#### `index.js` (Main Module)
- Exports object with `foo()` method
- Simple structure: `module.exports = { foo: () => 'bar' }`
- Any new methods require corresponding tests for coverage

#### `test.js` (Test Suite)
- Uses `dotest` testing framework (not Jest/Mocha)
- Structure: `dotest.add('description', test => { ... })`
- Tests both interface (types) and functionality
- Coverage reports generated automatically

#### `.eslintrc` (Linting Configuration)
- ESLint v7 configuration with strict rules
- Notable rules: `lines-around-comment`, `no-inline-comments`, strict indentation
- Configuration is inherited by the `dotest` framework during testing

### GitHub Actions
Located in `.github/workflows/`:
- `env-from-json.yml`: Tests environment variable handling across Node.js LTS versions
- `git-commit.yml`: Tests git commit functionality (workflow_dispatch only)

**Note**: These are experimental workflows and don't run on pull requests.

### Dependencies
- **`dotest`**: Test runner that combines ESLint + tests + coverage
  - Automatically runs ESLint before tests
  - Generates Istanbul coverage reports
  - Integrates with Coveralls.io on CI

## Validation and CI Process

### Pre-commit Validation Steps
When making changes, always run these commands in order:

1. **Install dependencies** (if not done): `npm install`
2. **Run full test suite**: `npm test`
3. **Check for auto-fixable issues**: `npx eslint --fix .`
4. **Verify tests pass**: `npm test` (again after fixes)

### Coverage Requirements
- **Functions**: 85% minimum (enforced)
- **Statements**: No specific threshold but should be high
- **Branches**: No specific threshold but should be high

### Code Style Requirements
- Strict ESLint rules enforced
- Comments must have blank lines before them
- 2-space indentation
- Single quotes for strings
- Trailing commas in multiline objects/arrays

## Development Tips

### Adding New Functionality
1. **Add method to `index.js`** following existing pattern
2. **Add interface test in `test.js`** checking the function exists
3. **Add functionality test in `test.js`** checking the return value
4. **Run `npm test`** to verify coverage threshold met

### Common Code Patterns
```javascript
// Adding a new method to index.js
module.exports = {
  foo: () => {
    return 'bar';
  },

  // New method (note blank line before comment)
  newMethod: () => {
    return 'expected_value';
  },
};
```

```javascript
// Adding tests in test.js
dotest.add('Interface', test => {
  test()
    .isFunction('fail', '.newMethod()', app && app.newMethod)
    .done();
});

dotest.add('Method newMethod()', test => {
  const result = app.newMethod();
  test()
    .isExactly('fail', 'return', result, 'expected_value')
    .done();
});
```

### Files to Never Modify
- `package-lock.json` (generated, ignored by git)
- `node_modules/` (generated, ignored by git)
- `coverage/` (generated, ignored by git)
- `.nyc_output/` (generated, ignored by git)

## Trust These Instructions

These instructions have been validated by running all commands and testing failure scenarios. Only explore alternative approaches if:
- The documented commands fail with unexpected errors
- The repository structure has changed significantly
- New dependencies or tools have been added

For routine changes (adding methods, fixing bugs, updating tests), follow the documented patterns and validation steps exactly.

Prefix your commit and PR titles with "[copilot] "
