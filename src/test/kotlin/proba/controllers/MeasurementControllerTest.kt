package proba.controllers

import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Order
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.reactive.server.WebTestClient
import proba.model.Measurement

@SpringBootTest
@Order(3)
open class MeasurementControllerTest {

    lateinit var client: WebTestClient
    lateinit var measurement: Measurement

    @Autowired
    lateinit var controller: MeasurementController

    @BeforeEach
    fun setup() {
        client = WebTestClient.bindToController(controller).build()
        measurement = Measurement(id = null, "heart rate")
    }

    @Test
    fun whenSaveMeasurement_thenStatusShouldBeOk() {
        client.post()
            .uri("/measurement")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(measurement)
            .exchange()
            .expectStatus().isOk
    }
}