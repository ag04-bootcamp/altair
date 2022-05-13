package proba.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import proba.database.repository.HealthRecordRepository
import proba.model.AverageHealthStatus
import proba.model.HealthRecord
import reactor.core.publisher.Mono

@RestController
class HealthRecordController(val repository: HealthRecordRepository) {

    var avgMeasurements = HashMap<String, Map<Int, Double>>()

    @PostMapping("/health/record")
    fun storeHealthRecord(@RequestBody record: HealthRecord):
            Mono<HealthRecord> = repository.save(record)

    @GetMapping("/health/{profileId}/avg")
    fun fetchHealthRecordAverage(@PathVariable("profileId") profileId: Long): Mono<AverageHealthStatus> =
                repository.findByProfileId(profileId)
                .collectList()
                .flatMap { list ->
                    list.groupBy({it.measurementName}, {it.value}).forEach { measurement ->
                        val cnt = measurement.value.size
                        val avg = measurement.value.reduce{acc, element -> acc + element} / cnt
                        avgMeasurements[measurement.key] = mapOf(cnt to avg)
                    }
                Mono.just(AverageHealthStatus(avgMeasurements))
                }

}
