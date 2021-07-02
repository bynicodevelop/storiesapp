FROM node:16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update -y && apt-get upgrade -y
RUN apt-get install git
RUN npm i -g npm@7.19.0

COPY . /usr/src/app/
RUN rm /usr/src/app/package-lock.json

RUN yarn
RUN yarn build

EXPOSE 8080

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=8080
ENV NODE_ENV=production
# ENV GOOGLE_APPLICATION_CREDENTIALS=/usr/src/app/stories-fans-firebase-adminsdk-2oyzx-8b03a16b62.json

CMD [ "yarn", "start" ]