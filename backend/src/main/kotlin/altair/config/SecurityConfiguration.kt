package altair.config

import org.springframework.context.annotation.Bean
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity
import org.springframework.security.config.web.server.ServerHttpSecurity
import org.springframework.security.config.web.server.invoke
import org.springframework.security.core.userdetails.MapReactiveUserDetailsService
import org.springframework.security.core.userdetails.ReactiveUserDetailsService
import org.springframework.security.core.userdetails.User
import org.springframework.security.web.server.SecurityWebFilterChain

@EnableWebFluxSecurity
open class SecurityConfiguration {

    @Bean
    open fun springSecurityFilterChain(http: ServerHttpSecurity): SecurityWebFilterChain {
        return http {
            authorizeExchange {
                authorize("/", permitAll)
                authorize("/login", permitAll)
                authorize("/sign-up", permitAll)
                authorize("/**", permitAll)
                //authorize("/**", hasAuthority("ROLE_USER"))
            }
            formLogin {
                this@http.csrf { disable() }
                loginPage = "/login"
            }
        }
    }

    @Bean
    open fun userDetailsService(): ReactiveUserDetailsService {
        val userDetails = User.withDefaultPasswordEncoder()
            .username("user")
            .password("password")
            .roles("USER")
            .build()
        return MapReactiveUserDetailsService(userDetails)
    }
}
