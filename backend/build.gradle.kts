import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "1.6.20"
}

group = "altair"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.junit.jupiter:junit-jupiter:5.8.1")
    // https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-parent
    implementation("org.springframework.boot:spring-boot-starter-parent:2.2.5.RELEASE")
    // https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-actuator
    implementation("org.springframework.boot:spring-boot-starter-actuator:2.6.6")
    // https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-webflux
    implementation("org.springframework.boot:spring-boot-starter-webflux:2.4.5")
    // https://mvnrepository.com/artifact/com.fasterxml.jackson.module/jackson-module-kotlin
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.13.1")
    // https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-data-r2dbc
    implementation("org.springframework.boot:spring-boot-starter-data-r2dbc:2.5.2")
    // https://mvnrepository.com/artifact/io.r2dbc/r2dbc-postgresql
    runtimeOnly("io.r2dbc:r2dbc-postgresql:0.8.10.RELEASE")
    implementation("org.springdoc:springdoc-openapi-webflux-core:1.6.8")
    implementation("org.springdoc:springdoc-openapi-webflux-ui:1.6.8")
    implementation("org.springdoc:springdoc-openapi-kotlin:1.6.8")
    // https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-security
    implementation("org.springframework.boot:spring-boot-starter-security:2.6.6")
    // https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-thymeleaf
    implementation("org.springframework.boot:spring-boot-starter-thymeleaf:2.6.6")
    // https://mvnrepository.com/artifact/org.thymeleaf.extras/thymeleaf-extras-springsecurity5
    implementation("org.thymeleaf.extras:thymeleaf-extras-springsecurity5:3.0.4.RELEASE")

    testImplementation(kotlin("test"))
    // https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-test
    testImplementation("org.springframework.boot:spring-boot-starter-test:2.6.6") {
        exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
    }
    // https://mvnrepository.com/artifact/org.springframework.security/spring-security-test
    testImplementation("org.springframework.security:spring-security-test:5.5.2")

}

tasks.test {
    useJUnitPlatform()
}

tasks.withType<KotlinCompile> {
    kotlinOptions.jvmTarget = "1.8"
}