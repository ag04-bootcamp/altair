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

    private var cnt: Int = 0

    @PostMapping("/health/{profileId}/record")
    fun storeHealthRecord(@PathVariable("profileId") profileId: Long,
                          @RequestBody record: HealthRecord): Mono<HealthRecord> =
                                repository.save(record)

    @GetMapping("/health/{profileId}/avg")
    fun fetchHealthRecordAverage(@PathVariable("profileId") profileId: Long): Mono<AverageHealthStatus> =
            repository.findByProfileId(profileId)
                .doFirst {
                    cnt = 1
                }
                .reduce(fun(acc, record): HealthRecord {
                    ++cnt
                    acc.bloodPressure += record.bloodPressure
                    acc.heartRate += record.heartRate
                    acc.temperature += record.temperature
                    return acc
                })
                .map { s ->
                    return@map AverageHealthStatus(
                        cnt, s.temperature / cnt,
                        s.bloodPressure / cnt,
                        s.heartRate / cnt
                    )
                }
}
