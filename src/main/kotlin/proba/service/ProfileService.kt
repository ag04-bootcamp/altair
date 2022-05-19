package proba.service;

import org.springframework.stereotype.Service;
import proba.database.repository.ProfileRepository;
import proba.model.Profile
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class ProfileService(private val repository: ProfileRepository) {

    fun save(profile: Profile): Mono<Profile> =
        repository.save(profile)

    fun getAllProfiles(): Flux<Profile> =
        repository.findAll()

    fun getAllForUser(userId: Long): Flux<Profile> =
        repository.findByUserId(userId)

    fun getById(id: Long): Mono<Profile> =
        repository.findById(id)

    fun deleteProfile(id: Long): Mono<Void> =
        repository.deleteById(id)

    fun deleteAllUserProfiles(userId: Long): Mono<Void> =
        repository.deleteByUserId(userId)

}
