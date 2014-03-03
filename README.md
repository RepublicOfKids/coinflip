# Coinflip

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

### Secrets.js

Notice the file `config/secrets.sample.js`. Duplicate this file into `config/secrets.js` and fill out the appropriate client and app ids. 

- Facebook: http://developer.facebook.com


### Start your sever

In order to start your server simply:

```
node app.js
```

Navigate your browser to `localhost:3000`.
