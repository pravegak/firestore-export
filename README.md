# Firestore Export Service

This service exports a remote firestore collection to a local CSV file.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes

## Prerequisites
To run this project you need to have [NodeJS](https://nodejs.org/en/) installed on your local development machine.

## Installation
To install the project dependencies run the following command in the project root directory
```shell
npm install 
```

## Configure firebase authentication
Create a config folder in the project root directory
```shell
mkdir config
```
Download your firebase service account key and save to the config directory. Your will have rename the file to "serviceAccountKey.json"

## Startup
Start the application by running the following command with command line arguments
```shell
npm start {YOUR_FIREBASE_URL} {YOUR_FIRESTORE_COLLECTION}
```