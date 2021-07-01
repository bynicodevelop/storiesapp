# storiesapp

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Deploy container

```bash
# Create tag
docker tag stories eu.gcr.io/stories-fans/app

# Deploy to repository
docker push eu.gcr.io/stories-fans/app
```