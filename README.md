# ReactBase UI

A React application frame with Firebase/Firestore integration

## About

This is an application frame with some basic functionality implemented
to kick start a React based application with Firebase/Firestore as
backend.

At the moment this project implements:

* user registration/login with Google as authentication provider
* manage user profile with custom profile picture
* use Redux to maintain the session/profile information of the user

## Usage

### Configure Firebase

To get started you will need a Firebase project. Gather the configuration
of this project as described here: [https://firebase.google.com/docs/web/setup](https://firebase.google.com/docs/web/setup)
Store the configuration in the `src/firebase/config.js` file (see the config.sample.js
for the format).

The Firestore rules and the Cloud Functions which are used by this project
are available in the [reactbase-srv](https://github.com/seabadger-io/reactbase-srv)
repository

### Install dependencies

Run `yarn install` from the project folder

### Run the development server

Run `yarn start`
