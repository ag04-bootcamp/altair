package proba.controllers

import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired

import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.reactive.server.WebTestClient
import proba.model.HealthRecord
import java.time.LocalDate

@SpringBootTest
internal class HealthRecordControllerTest {

    lateinit var client: WebTestClient
    lateinit var healthRecord: HealthRecord

    @Autowired
    lateinit var controller: HealthRecordController

    @BeforeEach
    fun setUp() {
        client = WebTestClient.bindToController(controller).build()
        healthRecord = HealthRecord(id = null, 1, 37.2,
            130.1, 77.3, LocalDate.now())
    }

    @Test
    fun whenRequestHealthRecord_thenStatusShouldBeOk() {
        client.post()
            .uri("/health/1/record")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(healthRecord)
            .exchange()
            .expectStatus().isOk
    }
}