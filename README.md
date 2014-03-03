# Coinflip [![Build Status](https://travis-ci.org/RepublicOfKids/coinflip.png?branch=master)](https://travis-ci.org/RepublicOfKids/coinflip)

## Install


### Getting started

Coinflip runs on node v0.10.26+. If you dont have nodejs on your hardware use something like homebrew to install it.

```
brew install node
```

Next use npm to gather the dependencies:

```
npm install
```

We use mongodb for our database. Similarly to how you installed node, install mongo:

```
brew install mongo
```

Ensure that mongo is running on your machine somewhere:

```
mongo
```

### Edit secrets.js

Notice the file `config/secrets.sample.js`. Duplicate this file into `config/secrets.js` and fill out the appropriate client and app ids. 

- Facebook: https://developer.facebook.com
- Coinbase: https://coinbase.com/oauth/applications


### Start your sever

In order to start your server simply:

```
node app.js
```

Navigate your browser to `localhost:3000`.
