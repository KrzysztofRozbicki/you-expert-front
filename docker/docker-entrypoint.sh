#!/bin/bash

if test "$1" == "run_dev"; then

    npm run build && npm run dev

elif test "$1" == "start"; then

    npm run build && npm run start

elif test "$1" == "lint"; then

    npm run build && npm run lint

else

    echo "Provide a command argument when running the container:"
    echo "  - run_dev"
    echo "  - start"
    echo "  - lint"
    echo ""
    echo "You provided: $@"
    exit 1

fi
