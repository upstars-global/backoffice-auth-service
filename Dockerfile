ARG DOCKER_PUBLIC_REPO=${DOCKER_PUBLIC_REPO}
ARG NODE_BASE_VERSION="node:20.11.0"
ARG NGINX_BASE_VERSION="nginx:1.25"

FROM ${DOCKER_PUBLIC_REPO}/${NODE_BASE_VERSION} AS build

WORKDIR /app
COPY . .

ARG CI_JOB_TOKEN
ARG FROM_CI_CORE_VERSION
RUN echo "Value of FROM_CI_CORE_VERSION: $FROM_CI_CORE_VERSION"

# Регулярное выражение для проверки формата vX.X.X
ARG PATTERN="^v[0-9]+\.[0-9]+\.[0-9]+$"

RUN if [ "$FROM_CI_CORE_VERSION" = "final" ]; then \
        sed -i "/ssh:\/\/git@gitlab.upstr.to:/c\    \"cardona-core-service\": \"git+https:\/\/gitlab-ci-token:$CI_JOB_TOKEN@gitlab.upstr.to\/backoffice\/cardona-core-service.git\"," package.json ; \
    elif [[ $FROM_CI_CORE_VERSION =~ $PATTERN ]]; then \
        sed -i "/ssh:\/\/git@gitlab.upstr.to:/c\    \"cardona-core-service\": \"git+https:\/\/gitlab-ci-token:$CI_JOB_TOKEN@gitlab.upstr.to\/backoffice\/cardona-core-service.git#$FROM_CI_CORE_VERSION\"," package.json ; \
    else \
        sed -i "s#ssh://git@gitlab.upstr.to:#https://gitlab-ci-token:$CI_JOB_TOKEN@gitlab.upstr.to/#g" package.json ; \
    fi

RUN cat package.json
RUN cat devVersion.json
RUN yarn install
RUN yarn build

ARG RELEASE_NAME=${RELEASE_NAME}
RUN sed -i "s/<\/head>/<script>window.RELEASE_NAME='$RELEASE_NAME';<\/script><\/head>/" /app/dist/index.html

FROM build AS unit-test
#RUN yarn test:unit
RUN yarn test:coverage

FROM ${DOCKER_PUBLIC_REPO}/${NGINX_BASE_VERSION}-alpine
RUN mkdir /app
COPY --from=build /app/dist /app
COPY nginx/default.conf /etc/nginx/templates/default.conf.template
COPY nginx/nginx.conf /etc/nginx/nginx.conf

RUN mkdir /app/public
ARG BUILD_COMMIT_SHA
ARG IMAGE_TAG
RUN echo "{\"commitSha\":\"$BUILD_COMMIT_SHA\",\"imageTag\":\"$IMAGE_TAG\",\"buildTs\":$(date +%s)}" > /app/public/version.json
