package proba.controllers

import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Order
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.reactive.server.WebTestClient
import proba.model.Profile
import java.time.LocalDate

@SpringBootTest
@Order(2)
open class ProfileControllerTest {

    lateinit var client: WebTestClient
    lateinit var profile: Profile

    @Autowired
    lateinit var controller: ProfileController

    @BeforeEach
    fun setup() {
        client = WebTestClient.bindToController(controller).build()
        profile = Profile(id = null,1,
            58.9, 172.0,
            "povremene glavobolje kaze Karlo :D", LocalDate.now())
    }

    @Test
    fun whenRequestProfile_thenStatusShouldBeOk() {
        client.post()
            .uri("/profile")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(profile)
            .exchange()
            .expectStatus().isOk
    }


}