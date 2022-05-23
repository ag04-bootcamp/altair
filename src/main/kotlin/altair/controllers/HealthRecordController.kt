package altair.controllers

import org.springframework.web.bind.annotation.*
import altair.model.AverageHealthStatus
import altair.model.HealthRecord
import altair.service.HealthRecordService
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
class HealthRecordController(private val service: HealthRecordService) {

    @PostMapping("/health/record")
    fun storeHealthRecord(@RequestBody record: HealthRecord):
            Mono<HealthRecord> = service.storeHealthRecord(record)

    @GetMapping("/health/{profileId}/records")
    fun getHealthRecord(@PathVariable("profileId") profileId: Long):
            Flux<HealthRecord> = service.getHealthRecords(profileId)

    @GetMapping("/health/{profileId}/avg")
    fun fetchHealthRecordAverage(@PathVariable("profileId") profileId: Long):
            Mono<AverageHealthStatus> = service.fetchHealthRecordAverage(profileId)

}
