plugins {
	id("org.springframework.boot") version "3.3.0"
	java
}

apply(plugin = "io.spring.dependency-management")

// tasks.jar {
//     manifest.attributes["Main-Class"] = "Application"
//     val dependencies = configurations.runtimeClasspath.get().map(::zipTree) // OR .map { zipTree(it) }
//     from(dependencies)
//     duplicatesStrategy = DuplicatesStrategy.EXCLUDE
// }

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web:3.4.0")
    
    compileOnly("org.projectlombok:lombok:1.18.22")
    annotationProcessor("org.projectlombok:lombok:1.18.22")
}