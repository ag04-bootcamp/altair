package proba.database.repository

import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import proba.model.Profile
import reactor.core.publisher.Flux

@Repository
interface ProfileRepository: ReactiveCrudRepository<Profile, Long> {

    @Query("delete from profile where user_id = :userId")
    fun deleteByUserId(userId: Long): Flux<Void>
}