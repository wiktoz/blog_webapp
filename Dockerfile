FROM node:22-alpine
WORKDIR /blog_webapp
COPY . /blog_webapp
RUN npm config set strict-ssl false
RUN npm install --progress=plain --force --loglevel verbose
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
CMD npm run dev