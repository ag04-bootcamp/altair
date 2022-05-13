package proba.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import proba.database.repository.MeasurementRepository
import proba.model.Measurement
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
class MeasurementController(val repository: MeasurementRepository) {

    @PostMapping("/measurement")
    fun save(@RequestBody measurement: Measurement):
            Mono<Measurement> = repository.save(measurement)

    @GetMapping("/measurement/all")
    fun getAll(): Flux<Measurement> = repository.findAll()

    @GetMapping("/measurement/{measurementId}")
    fun findById(@PathVariable measurementId: Long):
            Mono<Measurement> = repository.findById(measurementId)

    @GetMapping("/measurement")
    fun findByName(@RequestParam name: String):
            Mono<Measurement> = repository.findByName(name)
}