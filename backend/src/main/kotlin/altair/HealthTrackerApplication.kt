package altair

import io.swagger.v3.oas.annotations.OpenAPIDefinition
import io.swagger.v3.oas.annotations.info.Info
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Configuration
import org.springframework.web.reactive.config.CorsRegistry
import org.springframework.web.reactive.config.EnableWebFlux
import org.springframework.web.reactive.config.WebFluxConfigurer


@SpringBootApplication
@OpenAPIDefinition(info =
        Info(title = "Health Tracker App", version = "1.0", description = "Documentation APIs v1.0"))
open class HealthTrackerApplication

@Configuration
@EnableWebFlux
open class CorsGlobalConfiguration : WebFluxConfigurer {
        override fun addCorsMappings(corsRegistry: CorsRegistry) {
                corsRegistry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("*")
                        .maxAge(3600)
        }
}

fun main(args: Array<String>) {
        runApplication<HealthTrackerApplication>(*args)
}