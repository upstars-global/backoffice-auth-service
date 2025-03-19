#!/bin/sh

for s in $(env | grep FROM_CI_); do
  echo -n " --build-arg ${s}"
done
