@echo off
title INVESTER MASTER SERVICE
cd ..
call gradlew.bat :master-service:bootRun --console plain --args='--spring.config.location=classpath:/application.properties'
pause