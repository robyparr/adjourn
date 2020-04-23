#
# Build Step
#
FROM ruby:2.6.4-alpine AS build-image

RUN apk update \
  && apk upgrade \
  && apk add --no-cache --update \
    build-base \
    postgresql-dev \
    nodejs \
    yarn \
    git \
    python \
    tzdata

# Set Rails to run in production
ENV RAILS_ENV production
ENV NODE_ENV production


ENV INSTALL_PATH /app
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH

COPY Gemfile Gemfile.lock ./
RUN gem install bundler \
  && bundle config set without 'development test' \
  && bundle install --jobs 10 --retry 5 \
  && rm -rf /usr/local/bundle/cache/*.gem \
  && find /usr/local/bundle/gems/ -name "*.c" -delete \
  && find /usr/local/bundle/gems/ -name "*.o" -delete

COPY package.json yarn.lock ./
RUN yarn install

COPY . ./

RUN SECRET_KEY_BASE=super-secret-key bundle exec rake assets:precompile
RUN rm -rf node_modules spec


#
# Production Image
#
FROM ruby:2.6.4-alpine

ENV INSTALL_PATH /app
RUN mkdir -p $INSTALL_PATH
WORKDIR $INSTALL_PATH

RUN apk update \
    && apk upgrade \
    && apk add --update --no-cache \
      tzdata \
      postgresql-client \
      nodejs \
      bash

COPY --from=build-image /usr/local/bundle/ /usr/local/bundle/
COPY --from=build-image $INSTALL_PATH $INSTALL_PATH

ENV RAILS_ENV production
ENV NODE_ENV production
ENV RAILS_LOG_TO_STDOUT true

CMD bundle exec puma -C config/puma.rb
