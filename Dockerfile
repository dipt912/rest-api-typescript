FROM node:carbon

WORKDIR /usr/src/rest-api-typescript

COPY ./ ./

RUN npm install 
CMD ["/bin/bash"]