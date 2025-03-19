#!/bin/sh

HELM_REPO_BASE_PATH="gitops/charts/lr"
APP_SET_BASE_PATH="application-set"
DEVELOP_ENV_NAME="${DEVELOP_ENV_NAME:-develop}"
HELM_CHART_NAME="cardona"

generate_json_and_yaml_config()
{
  local _PATH="${1}"
  local _JSON_FILE="${CI_COMMIT_REF_SLUG}.json"
  local _YAML_FILE="${CI_COMMIT_REF_SLUG}-values.yaml"
  local _TAG="${CI_COMMIT_REF_SLUG}"
  local _PUBLIC_URL="${_TAG}.${CI_PROJECT_NAME}-${DEVELOP_ENV_NAME}.${APEX_DOMAIN}"

  if [ ! -f "${_PATH}/${_YAML_FILE}" ]; then
      touch "${_PATH}/${_YAML_FILE}"
  fi

  cat <<EOF > "${_PATH}/${_JSON_FILE}"
  {
    "meta":
      {
        "tag": "${_TAG}",
        "image_tag": "${CI_COMMIT_REF_SLUG}_${CI_PIPELINE_ID}",
        "commit_sha": "${CI_COMMIT_SHA}",
        "commit_short_sha": "${CI_COMMIT_SHORT_SHA}",
        "commit_timestamp": "${CI_COMMIT_TIMESTAMP}",
        "gitlab_user": "${GITLAB_USER_LOGIN}",
        "pipeline_url": "${CI_PIPELINE_URL}",
        "source_helm_url": "https://${OLD_CI_SERVER_HOST}/${HELM_REPO_BASE_PATH}/${HELM_CHART_NAME}.git",
        "source_file_path": "${_PATH}/${_JSON_FILE}",
        "source_values_file_path": "${_PATH}/${_YAML_FILE}",
        "public_url": "${_PUBLIC_URL}"
      }
  }
EOF
}

clone_repo()
{
  local _HELM_REPO="${1}"
  local _GIT_REPO_URL="https://${PUSH_APP_SET_USER}:${OLD_PUSH_APP_SET_TOKEN}@${OLD_CI_SERVER_HOST}/${HELM_REPO_BASE_PATH}/${_HELM_REPO}.git"

  echo "Clone ${_GIT_REPO_URL}"
  git config --global user.name "GitLab CI Commit Bot"
  git config --global user.email gitlab_ci_bot@bbq.agency
  git clone --verbose "${_GIT_REPO_URL}"
  cd "${_HELM_REPO}"
  git remote set-url origin "${_GIT_REPO_URL}"
  cd -
}

push_changes()
{
  git pull
  git add --all
  git commit -m "Added by CI Bot. Details ${CI_PIPELINE_URL}"
  git status
  git push origin
}

main()
{
  clone_repo "${HELM_CHART_NAME}"
  cd "${HELM_CHART_NAME}"
  git checkout ${DEVELOP_ENV_NAME}
  generate_json_and_yaml_config "${APP_SET_BASE_PATH}/${DEVELOP_ENV_NAME}/${HELM_CHART_NAME}"
  push_changes
}

main
