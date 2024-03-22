FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY build/libs/redistest-0.0.1-SNAPSHOT.jar redistest.jar

EXPOSE 8080

ENTRYPOINT exec java -jar redistest.jar

#COPY build/libs/*.jar application.jar
#
#EXPOSE 8000
#
#CMD ["java", "-jar", "application.jar"]