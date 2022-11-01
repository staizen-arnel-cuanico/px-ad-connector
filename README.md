# PX Azure AD Connector

The PX Azure AD Connector loads user data from Azure Active Directory into the Staff Microservice via gRPC. This is deployed in a Timer Trigger Azure Function.

## Table of Contents

1. [Prerequisites](#prerequisites)
   - [Installing Azurite (for local development only)](#installing-azurite-for-local-development-only)
2. [Configuration](#configuration)
   - [Generating Typescript files from .proto files](#generating-typescript-files-from-proto-files)
   - [Changing Timer Trigger Schedule](#changing-timer-trigger-schedule)
3. [Deployment](#deployment)
   - [Installation](#installation)
   - [Running Unit Tests](#running-unit-tests)
   - [Running the App](#running-the-app)
4. [CI/CD Setup](#cicd-setup)
5. [References](#references)
6. [Technology Stack](#technology-stack)

## Prerequisites

- [NodeJS >= 18](https://nodejs.dev/learn/how-to-install-nodejs)
- [pnpm >= 7.13](https://pnpm.io/installation)
- [Azure Function Core Tools >= 4.0](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local)
- [protoc >= 3.12](https://grpc.io/docs/protoc-installation/)
- [Azurite](https://github.com/Azure/Azurite) (for local development only)
- PX Staff Management microservice

### Installing Azurite (for local development only)

Azurite is an open-source Azure Storage Emulator which is required to emulate the BlobContainerClient for ScheduleMonitor which is required to run the Timer trigger function locally. You can install it using one of the options below:

- [VS Code plugin](https://marketplace.visualstudio.com/items?itemName=Azurite.azurite)
- [azurite npm package](https://github.com/Azure/Azurite#npm)
- Run as [Docker container](https://github.com/Azure/Azurite#dockerhub)

## Configuration

Copy the .env.sample file to a new .env file. When adding new environment variables, make sure to add the new variable to the .env.sample file.

For local development, copy the local.settings.json.example file to a new local.settings.json file. When using a storage emulator, set **AzureWebJobsStorage** to **UseDevelopmentStorage=true**

```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true"
  }
}
```

### Generating Typescript files from .proto files

If there is a change in the staff.proto file, edit the file first then run the following command to generate the corresponding staff.pb.ts file

```bash
$ pnpm run proto:build
```

### Changing Timer Trigger Schedule

To change every when the Azure Function will trigger, edit the **schedule** attribute under in the [loadAzureADUsers/function.json](loadAzureADUsers/function.json) file.

## Deployment

### Installation

```bash
# install dependencies
$ pnpm install
```

### Running Tests

```bash
# unit tests
$ pnpm run test


# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

### Running the App
#### Development
```bash
# run azurite
$ azurite
```
```bash
$ pnpm run func:start
```

## CI/CD Setup

_Write on how to setup the CI/CD for the project or how the CI/CD is currently setup in Github_

## References

- [NestJS Docs](https://docs.nestjs.com/)

## Technology Stack

- [NodeJS](https://nodejs.org/en/about/)
- [Typescript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [Jest](https://jestjs.io/docs/getting-started)
- [pnpm](https://pnpm.io/)
