FROM node:18-alpine as build
COPY . /opt/
WORKDIR /opt/
RUN yarn && yarn build

FROM node:18-alpine
WORKDIR /opt/
COPY --from=build /opt/.next/ /opt/.next/
COPY --from=build /opt/.next/static .next/standalone/.next/

EXPOSE 80
ENV PORT 80
CMD ["node", ".next/standalone/server.js"]
