package proba.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import proba.model.Measurement
import proba.service.MeasurementService
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
class MeasurementController(private val service: MeasurementService) {

    @PostMapping("/measurement")
    fun save(@RequestBody measurement: Measurement):
            Mono<Measurement> = service.save(measurement)

    @GetMapping("/measurement/all")
    fun getAll(): Flux<Measurement> = service.getAllMeasurements()

    @GetMapping("/measurement/{measurementId}")
    fun findById(@PathVariable measurementId: Long):
            Mono<Measurement> = service.getById(measurementId)

    @GetMapping("/measurement")
    fun findByName(@RequestParam name: String):
            Mono<Measurement> = service.getByName(name)
}