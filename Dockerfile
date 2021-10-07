FROM node:14.17.1 as base


# Add package file
COPY package*.json ./

# Install deps
RUN yarn install

# Copy source
COPY src ./src
COPY tsconfig.json ./tsconfig.json
#COPY openapi.json ./openapi.json

# Build dist
RUN yarn build

# Start production image build
FROM gcr.io/distroless/nodejs:14

# Copy node modules and build directory
COPY --from=base dist dist

# Expose port 3000
EXPOSE 5000
CMD ["dist/src/server.js"]
