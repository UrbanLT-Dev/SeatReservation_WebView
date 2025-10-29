From node:22.12.0 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

# 환경 변수 파일 복사
COPY .env.dev .env.dev

COPY . .

# 환경 변수 설정
ENV VITE_API_URL=https://medam.urbanlt.co.kr/api

RUN npm run build:dev 

FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d/*

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 59090

CMD ["nginx", "-g", "daemon off;"]