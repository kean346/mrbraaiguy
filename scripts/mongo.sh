#!/usr/bin/env bash
set -euo pipefail
image='mongo@sha256:b9924c330a8bbc5800fe9c69f04a84e221eca7b28fd049a0354147d9908fa142'
if ! docker inspect ember-glass-mongo >/dev/null 2>&1; then
  docker run -d --name ember-glass-mongo -p 127.0.0.1:27017:27017 -v ember-glass-mongo-data:/data/db "$image" mongod --replSet ember-rs --bind_ip_all >/dev/null
else
  docker start ember-glass-mongo >/dev/null
fi
for attempt in {1..30}; do
  if docker exec ember-glass-mongo mongosh --quiet --eval 'db.adminCommand({ping:1}).ok' 2>/dev/null | grep -q 1; then break; fi
  sleep 1
done
docker exec ember-glass-mongo mongosh --quiet --eval 'try {rs.status()} catch(e) {rs.initiate({_id:"ember-rs",members:[{_id:0,host:"localhost:27017"}]})}' >/dev/null
for attempt in {1..30}; do
  if docker exec ember-glass-mongo mongosh --quiet --eval 'db.hello().isWritablePrimary' | grep -q true; then
    echo 'Persistent local MongoDB replica set ready on 127.0.0.1:27017.'; exit 0
  fi
  sleep 1
done
echo 'MongoDB did not elect a primary.' >&2
exit 1
