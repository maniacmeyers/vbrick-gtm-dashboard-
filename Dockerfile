FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm@10.4.1

# Copy patches and install dependencies
COPY patches ./patches
RUN pnpm install --frozen-lockfile 

# Copy built application and database schema
COPY dist ./dist
COPY drizzle ./drizzle

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]

