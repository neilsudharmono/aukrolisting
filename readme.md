# Cypress

Cypress.io is a automated testing tool. It's mostly useful for conducting functional tests of an application that runs in a browser.  

This repository includes the recommended Node packages and configurations for Automated Testing at Luminary.

- [Cypress](#cypress)
    - [Requirements](#requirements)
    - [Installation steps](#installation-steps)
        - [Pipeline Configuration](#pipeline-configuration)
    - [Usage](#usage)
    - [Testing Structure](#testing-structure)
    - [Environment Values](#environment-values)
    - [Secret Management](#secret-management)


## Requirements

- Node 10.16.0 (or later)
- npm 6.9.0 (as part of Node 10.16.0 LTS)
- Cypress.io 3.4.0 or later


## Installation steps


- Clone this repo to your local machine
- Modify `package.json` to use correct project name for your new project
- Delete `.git` file from the local folder
- Initialise a new local repo with `git init` - see guide from Atlassian [here](https://www.atlassian.com/git/tutorials/setting-up-a-repository/git-init)
- Use `git remote set-url` to update your remote to your project specific repo.
    - e.g. Set the remote to `projectName-qa` repo
- Run `npm install` to download dependencies
- Update `cypress.json` to use correctly environment variables for your project
    - `baseUrl` can be set to be your standard testing URL (e.g. localhost or .dev)
    - `projectId` refers to the Dashboard service ID for this project
- Create `cypress.env.json` to store secrets (API Keys / Passwords etc). This should *NOT* be checked into the project repo. 

- Write tests!

### Pipeline Configuration

To run Cypress in headless mode with an `env` variable - use the following:

- `npm run cy:run --env ENV_VARIABLE_HERE=VALUE`

For example, if your `env` has a variable for Live or Test payments on a Payment Gateway:

- `npm run cy:run --env livePayments=false`

---

## Usage

- Create `.spec.js` test files for each section of the project you'd like to write tests about. 
    - Refer to the Cypress documentation or Kitchen Sink code for examples. 

- Create `.method.js` files for the functional logic behind each test file. 
    - Export all functions at base of file

- Import modules form `.method.js` files into your `.spec.js` files

- Run `npm run cy:open` to open Cypress app and view tests.
    - OR Run `npm run cy:run` to run current tests in headless mode

---

## Testing Structure

Tests are organised by functionality or Epic within the 'Integration' folder.

Readability of the test function is critical and is achieved by separating verbose testing logic from the test case itself. 

- Test cases are stored in .spec.js files, with functional logic imported. 
- Testing logic is stored in .method.js files and exported for usage elsewhere

```
/cypress
  /fixtures
    - example.json

  /integration
    /global (feature  / epics)
      - login.spec.js
	/products
	  - addProduct.spec.js (tests)
	  - addProduct.method.js (logic)

  /plugins
    - index.js

  /support
    - commands.js (global shared commands - imported into cy() object)
    - index.js
```

This means that test functions are readable. It also means that Test logic can be updated once for all tests that rely on the code. 

Example from a `login.spec.js` file

```
import { checkLoginFormAppear } from './login.method';

describe('Login to Kentico Admin', function () {
    beforeEach(() => {
        cy.fixture("LoginData.json").as("loginAdmin");
         cy.visit('/admin');
    });

    it('check login page is rendered', function () {        
        checkLoginFormAppear();   
    })

    it('logs into Kentico', function () {        
        cy.doKenticoLogin(password));
    })
})
```

--- 

## Environment Values

All environment values should be kept in the `cypress.json` file. 

!! Do **NOT** store secrets such as passwords, API keys, tokens etc. Please refer to [Secret Management](#secret-management) !! 

These should include values, such as URLs for Staging or Production, that are **consistent** across the project and for all QA team-members. 

Cypress will look for values in this file via the `Cypress.env("valueGoesHere")` method. 

## Secret Management

End-to-end testing will require secret values - whether it is a password, API key or otherwise. 

Secret values should be managed by individual QA team members or developers on their local machines. 

In the event of a secret value needing to be shared between users (or used in a deployment pipeline) - Azure KeyVaults will be setup. 

