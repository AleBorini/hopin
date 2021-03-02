FROM gcr.io/faceit-general/cypress-included:6.2

WORKDIR /home/jenkins

ADD --chown=jenkins:jenkins cypress.json .
ADD --chown=jenkins:jenkins tsconfig.json .

ADD --chown=jenkins:jenkins package.json .
ADD --chown=jenkins:jenkins package-lock.json .  

ADD --chown=jenkins:jenkins reporter-config.json .

ADD --chown=jenkins:jenkins cypress cypress

RUN npm ci