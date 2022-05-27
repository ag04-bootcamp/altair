package altair

import altair.service.initBasePath
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

fun normalizeArgs(args: Array<String>): Map<String, String>{
        val argsMap = mutableMapOf<String, String>()
        for (arg in args){
                val spl = arg.split("=")
                argsMap[spl[0]] = spl[1]
        }
        return argsMap
}
@Configuration
open class CorsGlobalConfiguration : WebFluxConfigurer {
        override fun addCorsMappings(corsRegistry: CorsRegistry) {
                corsRegistry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("*")
                        .maxAge(3600)
        }
}

fun main(args: Array<String>) {
        val argsMap = normalizeArgs(args)
        initBasePath(argsMap["uploadsDirectory"])
        runApplication<HealthTrackerApplication>(*args)
}