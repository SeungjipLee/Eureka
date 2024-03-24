FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY build/libs/*.jar application.jar

EXPOSE 8001

CMD ["java", "-jar", "application.jar"]