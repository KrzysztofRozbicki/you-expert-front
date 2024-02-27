FROM node:14-buster-slim

WORKDIR /code
ARG API_HOST

COPY package.json ./
RUN npm install
COPY . .

RUN npm run build
EXPOSE 3000

# Copy container entrypoint
COPY ./docker/docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x "/docker-entrypoint.sh"
ENTRYPOINT ["/docker-entrypoint.sh"]

# Default CMD
# Running the app
CMD ["run_dev"]
