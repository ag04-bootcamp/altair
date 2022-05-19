package proba.service

import org.springframework.stereotype.Service
import proba.database.repository.MeasurementRepository
import proba.model.Measurement
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class MeasurementService(private val repository: MeasurementRepository) {

    fun save(measurement:Measurement): Mono<Measurement> =
        repository.save(measurement)

    fun getAllMeasurements(): Flux<Measurement> =
        repository.findAll()

    fun getById(id: Long): Mono<Measurement> =
        repository.findById(id)

    fun getByName(name: String): Mono<Measurement> =
        repository.findByName(name)
}