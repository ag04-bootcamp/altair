package altair.controllers

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Order
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.reactive.server.WebTestClient
import altair.model.Users
import java.time.LocalDateTime

@SpringBootTest
@Order(1)
internal class UsersControllerTest {

    lateinit var client: WebTestClient
    lateinit var users: Users

    @Autowired
    lateinit var controller: UsersController

    @BeforeEach
    fun setup() {
        client = WebTestClient.bindToController(controller).build()
        users = Users(id = null, "ana", "nestostop", LocalDateTime.now(),
                "blbla", "rha", "fgjw")
    }
    @Test
    fun whenSaveUser_thenStatusShouldBeOk() {
        client.post()
            .uri("/users")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(users)
            .exchange()
            .expectStatus().isOk
    }
}