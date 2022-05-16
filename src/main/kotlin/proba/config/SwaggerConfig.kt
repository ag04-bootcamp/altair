package proba.config

import org.springdoc.core.GroupedOpenApi
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration


@Configuration
open class SwaggerConfig {

    @Bean
    open fun profileGroupApi(): GroupedOpenApi? {
        return GroupedOpenApi.builder()
            .group("Profile")
            .pathsToMatch("/profile/**")
            .build()
    }

    @Bean
    open fun healthGroupApi(): GroupedOpenApi? {
        return GroupedOpenApi.builder()
            .group("Health Record")
            .pathsToMatch("/health/**")
            .build()
    }

    @Bean
    open fun measurementGroupApi(): GroupedOpenApi? {
        return GroupedOpenApi.builder()
            .group("Measurement")
            .pathsToMatch("/measurement/**")
            .build()
    }
}