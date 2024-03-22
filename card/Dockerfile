FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY build/libs/*.jar application.jar

EXPOSE 8000

CMD ["java", "-jar", "application.jar"]