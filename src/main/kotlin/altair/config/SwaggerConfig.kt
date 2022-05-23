package altair.config

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

    @Bean
    open fun usersGroupApi(): GroupedOpenApi? {
        return GroupedOpenApi.builder()
            .group("Users")
            .pathsToMatch("/users/**")
            .build()
    }

    @Bean
    open fun fileGroupApi(): GroupedOpenApi? {
        return GroupedOpenApi.builder()
            .group("Files")
            .pathsToMatch("/file/**")
            .build()
    }
}