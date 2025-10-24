FROM node:22-alpine

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@10.4.1

# Copy package files and patches first
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

# Install ALL dependencies (including openai)
RUN pnpm install --frozen-lockfile

# Now copy the built application
COPY dist ./dist
COPY drizzle ./drizzle

# Expose port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["node", "dist/index.js"]

