package altair.database.repository

import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import altair.model.Profile
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Repository
interface ProfileRepository: ReactiveCrudRepository<Profile, Long> {

    @Query("select p.* from profile p where user_id = :userId")
    fun findByUserId(userId: Long): Flux<Profile>
    @Query("delete from profile where user_id = :userId")
    fun deleteByUserId(userId: Long): Mono<Void>
}