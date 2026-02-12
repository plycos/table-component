FROM node:24-alpine AS base
RUN npm i -g pnpm@10

FROM base AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM scratch
COPY --from=build /app/dist /
