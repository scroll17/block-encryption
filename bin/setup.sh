file=$1
options=$2

npx ts-node-dev --respawn --transpile-only "$1" "$2"