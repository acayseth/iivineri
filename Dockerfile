FROM node:18-alpine
COPY . /opt/
WORKDIR /opt/
RUN yarn && yarn build
EXPOSE 80
ENV PORT 80
CMD ["node", ".next/standalone/server.js"]
