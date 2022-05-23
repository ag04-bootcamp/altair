package altair.service

import org.springframework.stereotype.Service
import altair.database.repository.HealthRecordRepository
import altair.model.AverageHealthStatus
import altair.model.HealthRecord
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class HealthRecordService(private val repository: HealthRecordRepository) {

    var avgMeasurements = HashMap<String, Map<Int, Double>>()

    fun storeHealthRecord(record: HealthRecord):
            Mono<HealthRecord> = repository.save(record)

    fun getHealthRecords(profileId: Long): Flux<HealthRecord> =
        repository.findByProfileId(profileId)

    fun fetchHealthRecordAverage(profileId: Long): Mono<AverageHealthStatus> {
        avgMeasurements.clear()
        return repository.findByProfileId(profileId)
            .collectList()
            .flatMap { list ->
                list.groupBy({ it.measurementName }, { it.value }).forEach { measurement ->
                    val cnt = measurement.value.size
                    val avg = measurement.value.reduce { acc, element -> acc + element } / cnt
                    avgMeasurements[measurement.key] = mapOf(cnt to avg)
                }
                Mono.just(AverageHealthStatus(avgMeasurements))
            }
    }


}