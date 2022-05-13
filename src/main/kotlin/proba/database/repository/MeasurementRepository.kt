package proba.database.repository

import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import proba.model.Measurement
import reactor.core.publisher.Mono

@Repository
interface MeasurementRepository: ReactiveCrudRepository<Measurement, Long> {

    @Query("select m.* from measurement where m.name = :name")
    fun findByName(name: String): Mono<Measurement>
}