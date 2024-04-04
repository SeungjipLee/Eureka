# 포팅메뉴얼
### [DB 덤프파일](../document/sql/)
### [시연](../document/eureka/)
### TOC

- [개발 환경](#개발-환경)
  - [1. 프로젝트 기술 스택 및 버전 정보](#1-프로젝트-기술-스택-및-버전-정보)
  - [2. 환경변수 설정](#2-환경-변수-설정)
    - [Back - 서비스 서버](#back-end-서비스-서버)
    - [Back - 카드사 서버](#back-end-카드사-서버)
- [프로젝트 실행 가이드](#프로젝트-실행-가이드)
  - [1. Front-end](#1-front-end-실행-가이드)
  - [2. Back-end](#2-back-end-실행-가이드)
- [배포 환경](#배포-환경)
  - [1. 서버 구성](#1-서버-구성)
  - [2. Nginx 설정](#2-nginx-sites-available)
  - [3. Docker 설치](#3-docker-설치)
  - [4. Jenkins](#4-jenkins)
  - [5. Database](#5-database)
  - [6. apk 빌드](#6-apk-빌드)
- [계정 정보](#계정-정보)

# 개발 환경

## 1. 프로젝트 기술 스택 및 버전 정보

### Front-end

- React Native : `0.73.6`
- Node.js : `20.10.0 LTS`
- Redux Toolkit : `2.2.2`
- expo : `50.0.14`
- SDK : `50`

### Data

- Python

### Database

- MySQL : `8.0.36`

### Server

- Nginx : `1.18.0`
- AWS

### CI/CD

- Docker : `25.0.4`
- Jenkins : `2.449`
- Ubuntu : `Ubuntu 20.04 LTS`

### UI/UX

- Figma

### Back-end

- Java : `17`
- Spring Boot : `3.2.3`
- Gradle : `8.6`
- ORM : JPA(Hibernate)
- SpringSecurity
- Swagger : `2.0.2`
- jjwt-api : `0.12.3`
- spring-batch-core : `5.1.1`

### IDE

- Visual Studio Code : `1.87.2`
- IntelliJ : `2023.3.2`
- Android Studio : `2023.2.1`

### Communication

- GitLab
- Jira
- MatterMost
- Notion

## 2. 환경 변수 설정

### Back-end (서비스 서버)

- 환경 변수 설정 위치

```json
backend
└── src
	└──main
		└──resources
			├── application.yml
			└── application-dev.yml
			└── application-prod.yml
```

- application.yml

```groovy
server:
  port: 8000
  servlet:
    context-path: /

spring:
  profiles:
    active: dev
```

- application-dev.yml (Local 환경용)

```groovy
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/eureka_db?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Seoul&zeroDateTimeBehavior=convertToNull&rewriteBatchedStatements=true&useSSL=false&allowPublicKeyRetrieval=true
    username: root
    password: 1234

  jpa:
    hibernate:
      ddl-auto: none
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        naming:
          physical-strategy: org.springframework.boot.orm.jpa.hibernate.SpringPhysicalNamingStrategy

  data:
    redis:
      host: localhost
      port: 6379
      password: 1234
      timeout: 3000

  batch:
    job:
      enabled: false
      # name: cardOwnershipJob
      # name: consumptionUserJob

cloud:
  aws:
    credentials:
      accessKey:
      secretKey:
    region:
      static:
    s3:
      bucket: eureka_bucket

feign:
  client:
    baseurl:
      myDataFeign: http://localhost:8001/card

jwt:
  secretKey: VYKlQrH0M4Gx7uUq7sXc7saINlUsZD9Vb6FZr5R4zoE
  accessTokenExpiration: 31536000000
  refreshTokenExpiration: 31536000000

logging:
  level:
    root: info
    org.hibernate:
      sql: debug
      type.type.descriptor.sql: trace
    com.ssafy.eureka:
      domain: debug
      common: debug

springdoc:
  packages-to-scan:
    - com.ssafy.eureka.domain
  default-consumes-media-type: application/json;charset=UTF-8
  default-produces-media-type: application/json;charset=UTF-8
  swagger-ui:
    display-request-duration: true
```

- application-prod.yml (배포 환경용)

```groovy
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://j10e101.p.ssafy.io:3306/eureka_db?useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Seoul&zeroDateTimeBehavior=convertToNull&rewriteBatchedStatements=true&useSSL=false&allowPublicKeyRetrieval=true
    username: eureka
    password: mysql_password

  jpa:
    hibernate:
      ddl-auto: none
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        naming:
          physical-strategy: org.springframework.boot.orm.jpa.hibernate.SpringPhysicalNamingStrategy

  data:
    redis:
      host: j10e101.p.ssafy.io
      port: 6379
      password: redis_password
      timeout: 3000

  batch:
    job:
      enabled: false
      # name: cardOwnershipJob
      # name: consumptionUserJob

cloud:
  aws:
    credentials:
      accessKey:
      secretKey:
    region:
      static:
    s3:
      bucket: eureka_bucket

feign:
  client:
    baseurl:
      myDataFeign: https://j10e101.p.ssafy.io/card

jwt:
  secretKey: VYKlQrH0M4Gx7uUq7sXc7saINlUsZD9Vb6FZr5R4zoE
  accessTokenExpiration: 31536000000
  refreshTokenExpiration: 31536000000

logging:
  level:
    root: info
    org.hibernate:
      sql: debug
      type.type.descriptor.sql: trace
    com.ssafy.eureka:
      domain: debug
      common: debug

springdoc:
  packages-to-scan:
    - com.ssafy.eureka.domain
  default-consumes-media-type: application/json;charset=UTF-8
  default-produces-media-type: application/json;charset=UTF-8
  swagger-ui:
    display-request-duration: true

```

### Back-end (카드사 서버)

- 환경 변수 설정 위치

```json
card
└── src
	└──main
		└──resources
			├── application.yml
			└── application-dev.yml
			└── application-prod.yml
```

- application.yml

```groovy
server:
  port: 8001
  servlet:
    context-path: /card

spring:
  profiles:
    active: dev

```

- application-dev.yml (Local 환경용)

```groovy
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/card_db?tinyInt1isBit=false&serverTimezone=UTC&characterEncoding=UTF-8
    username: root
    password: 1234

  jpa:
    hibernate:
      ddl-auto: none
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.MySQLDialect
      defer-datasource-initialization on: true

  data:
    redis:
      host: localhost
      port: 6379
      password: 1234
      timeout: 3000

logging:
  level:
    com.ssafy.card: debug

jwt:
  secret: f35FS462GS54GADBNK32aXVH335YRGSF67JGH042FWD;

```

- application-prod.yml (배포 환경용)

```groovy
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://j10e101.p.ssafy.io:3307/card_db?tinyInt1isBit=false&serverTimezone=UTC&characterEncoding=UTF-8
    username: eureka
    password: mysql_password

  jpa:
    hibernate:
      ddl-auto: none
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.MySQLDialect
      defer-datasource-initializati on: true

  data:
    redis:
      host: j10e101.p.ssafy.io
      port: 6380
      password: redis_password

logging:
  level:
    com.ssafy.card: debug

jwt:
  secret: f35FS462GS54GADBNK32aXVH335YRGSF67JGH042FWD;

```

# 프로젝트 실행 가이드

## 1. Front-end 실행 가이드

### 사전 필수 설정 사항

1. Android Studio `2023.2.1` 설치
2. Node.js `20.10.1` 설치
3. Expo 회원가입 - [링크](https://expo.dev/signup)
4. 패키지 설치

```bash
npm install -g eas-cli
```

### 로컬 실행

- `frontend` 프로젝트 열기
- `npm install` 실행
- 안드로이드 스튜디오 에뮬레이터 실행
  - - pixel 7 pro
  - sv2
- `npm start` 실행
- `Press a` - open Android

### 배포된 앱 설치

- `https://j10e101.p.ssafy.io/` 접속
- 설치

## 2. Back-end 실행 가이드

### 사전 필수 설정 사항

1. Intellij `2023.3.2` 설치
2. `Java 17` 설치 및 환경변수 설정
3. MySQL `8.0.36`

### 실행

- `backend` / `card` 프로젝트 열기
- `JKD 17` 버전 확인
- 환경 변수 설정
- `src/main/java` `BackendApplication` / `CardApplication`실행

# 배포 환경

## 1. 서버 구성

22  
8989 - 게릿
443  
8080/tcp - Jenkins  
8000 - 백엔드 서버
8001 - 카드 서버
3306 - 백엔드 db
3307 - 카드 db  
3000 - apk파일 설치 페이지
80  
6379 - 백엔드 redis
6380 - 카드 레디스

## 2. nginx sites-available

```bash
server {
        listen 80;

        root /home/ubuntu/jenkins-data/workspace/eureka/frontend-web/dist/;
        index index.html;
        server_name j10e101.p.ssafy.io;

        # frontend web
        location / {
                try_files $uri $uri/ /index.html;
        }

        # backend server
        location /api {
                proxy_pass http://j10e101.p.ssafy.io:8000;
                proxy_redirect off;
                charset utf-8;

                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }

        # card server
        location /card {
                proxy_pass http://j10e101.p.ssafy.io:8001;
                proxy_redirect off;
                charset utf-8;

                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }

        listen [::]:443 ssl ipv6only=on; # managed by Certbot
        listen 443 ssl; # managed by Certbot

        ssl_certificate /etc/letsencrypt/live/j10e101.p.ssafy.io/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/j10e101.p.ssafy.io/privkey.pem; # managed by Certbot

        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

server {
        if ($host = j10e101.p.ssafy.io) {
                return 301 https://$host$request_uri;
        } # managed by Certbot

        listen 80 ;
        listen [::]:80 ;
        server_name j10e101.p.ssafy.io;
        return 404; # managed by Certbot

}

```

## 3. Docker 설치

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## 4. Jenkins

### Jenkins docker 파일

```bash
FROM jenkins/jenkins:jdk17

# 호스트의 docker 그룹 GID를 받기 위한 인자.
ARG DOCKER_GID=998

# 'root' 사용자로 전환하여 설치 작업을 수행
USER root

# 필요한 패키지 설치
RUN apt-get update && apt-get install -y curl zip unzip

# Node.js 설치
ENV NODE_VERSION=v20.11.1
ENV NODE_HOME=/opt/nodejs
RUN curl -L "https://nodejs.org/dist/${NODE_VERSION}/node-${NODE_VERSION}-linux-x64.tar.gz" -o /tmp/nodejs.tar.gz && \
    mkdir -p ${NODE_HOME} && \
    tar -xzf /tmp/nodejs.tar.gz -C ${NODE_HOME} --strip-components=1 && \
    rm /tmp/nodejs.tar.gz

# NODE_HOME 환경 변수 설정 및 PATH에 추가
ENV PATH=$PATH:$NODE_HOME/bin

# EAS CLI 설치
RUN npm install -g eas-cli

# Gradle 설치
ENV GRADLE_VERSION=8.6
RUN mkdir -p /opt/gradle && \
    curl -L "https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip" -o /tmp/gradle.zip && \
    unzip -d /opt/gradle /tmp/gradle.zip && \
    mv /opt/gradle/gradle-${GRADLE_VERSION} /opt/gradle/latest && \
    rm /tmp/gradle.zip

# GRADLE_HOME 환경 변수 설정
ENV GRADLE_HOME=/opt/gradle/latest
ENV PATH=$PATH:$GRADLE_HOME/bin

# 필요한 패키지 설치 및 Docker 저장소 GPG 키를 안전하게 추가
RUN apt-get update && \
    apt-get -y install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 안전하게 추가된 키를 사용하여 Docker 저장소를 추가
RUN echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Docker CE CLI 설치
RUN apt-get update && \
    apt-get -y install docker-ce-cli

# docker-compose 설치
RUN curl -L "https://github.com/docker/compose/releases/download/2.24.6/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

# Docker 그룹 생성 및 사용자 추가
RUN usermod -aG ${DOCKER_GID} jenkins

# 'jenkins' 사용자로 다시 전환
USER jenkins
```

### 젠킨스 도커 이미지 빌드

```bash
docker build -t custom-jenkins .
```

### 플러그인

`Post build task`

`GitLab`

`Gitlab API`

`Gradle Plugin`

`NodeJS`

`Docker Pipeline`

`Docker Compose Build Step`

### 파이프라인

- 환경변수를 `Credentials`의 Secret file로 설정
  - file(credentialsId: 'application-eureka', variable: 'application_eureka')
  - file(credentialsId: 'application-card', variable: 'application_card')
  - file(credentialsId: 'eureka-config', variable: 'eureka_application_prod')
  - file(credentialsId: 'card-config', variable: 'card_application_prod')

```bash
pipeline {
    agent any

    tools {
        nodejs "nodejs"
        gradle "gradle"
    }

    stages {
        stage('clone repository') {
            steps {
                git branch: 'develop', credentialsId: 'S10P22E101', url: 'https://lab.ssafy.com/s10-fintech-finance-sub2/S10P22E101'
            }
        }

        stage('front_build'){
            steps{
                dir('frontend-web'){
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('credential.yml download') {
            steps {
                withCredentials([file(credentialsId: 'application-eureka', variable: 'application_eureka'),
                                file(credentialsId: 'application-card', variable: 'application_card'),
                                file(credentialsId: 'eureka-config', variable: 'eureka_application_prod'),
                                file(credentialsId: 'card-config', variable: 'card_application_prod')]) {
                    script {
                        sh "cp \$application_eureka backend/src/main/resources/application.yml"
                        sh "cp \$application_card card/src/main/resources/application.yml"

                        sh "cp \$eureka_application_prod backend/src/main/resources/application-dev.yml"
                        sh "cp \$card_application_prod card/src/main/resources/application-dev.yml"
                    }
                }
            }
        }

        stage('card_build'){
            steps{
                dir('card'){
                    sh 'gradle clean build'
                }
            }
        }

        stage('back_build'){
            steps{
                dir('backend'){
                    sh 'gradle clean build'
                }
            }
        }

        stage('deploy'){
            steps{
                script {
                    sh 'docker compose down --volumes'
                    sh 'docker compose up --build -d'
                    sh 'docker image prune -f'
                }
            }
        }
    }
}

```

## 5. Database

### MySQL

- 서비스

```bash
docker run --name 컨테이너이름 -e MYSQL_ROOT_PASSWORD=mysql_password -d -p 3306:3306 mysql:8.0
```

- 카드사

```bash
docker run --name 컨테이너이름 -e MYSQL_ROOT_PASSWORD=mysql_password -d -p 3307:3306 mysql:8.0
```

### Redis

- 서비스

```bash
docker run --name eureka-redis -d -p 6379:6379 redis redis-server --requirepass redis_password
```

- 카드사

```bash
docker run --name eureka-redis -d -p 6380:6379 redis redis-server --requirepass redis_password
```

## 6. apk 빌드

- Expo 웹 사이트 로그인
- [Projects] - [Create a Project]
- Display Name - frontend
- id 명령어 복사
  - eas init --id `아이디`
- Expo 로그인

```bash
npx expo login
```

- id 명령어 실행

```bash
eas init --id `아이디`
```

- 빌드 명령어 입력

```bash
eas build -p android --profile preview
```

# 계정 정보

### Jenkins

- Id : admin
- Password : 3ehfehswkq101@

### MySQL

- Id: eureka
- Password : 3ehfehswkq101@

### Redis

- Password : 3ehfehswkq101@

## 서비스 접속 정보

`카드사 db에 유저 정보가 없다면 서비스에서 회원가입이 되지 않습니다!`

### 유저 정보

이름: 이싸피
생년월일: 000102
주민번호 뒷자리: 3
휴대폰 번호: 010-2222-2222
인증번호: 123456

### 카드 번호, cvc 정보

KB국민카드

- LG U+ 체크카드

  - 2000-0000-0000-0002

- The CJ KB국민카드
  - 2000-0000-0000-0006

삼성카드

- American Express Blue(아멕스블루)
  - 2000-0000-0000-0003

하나카드

- 모두의 일상 체크카드
  - 2000-0000-0000-0001
- 원더카드 LIVING
  - 2000-0000-0000-0004

우리카드

- SKT 우리카드
  - 2000-0000-0000-0005

공통 cvc: 000, 유효기간: 01/25, 비밀번호 앞2 : 12
