FROM node:22-alpine

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy workspace files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.base.json tsconfig.json ./
COPY packages/frontend/package.json ./packages/frontend/
COPY packages/backend/package.json ./packages/backend/

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Copy frontend source
COPY packages/frontend ./packages/frontend/

EXPOSE 5173

CMD ["pnpm", "-C", "packages/frontend", "dev", "--host", "0.0.0.0"]
