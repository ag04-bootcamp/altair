package proba.controllers

import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import proba.database.repository.ProfileRepository
import proba.model.Profile
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
class ProfileController(val repository: ProfileRepository) {

    @PostMapping("/profile")
    fun save(@RequestBody
             profile: Profile): Mono<Profile> = repository.save(profile)

    @GetMapping("/profile/{profileId}")
    fun getProfile(@PathVariable profileId: Long):
            Mono<Profile> = repository.findById(profileId)

    @DeleteMapping("/profile/{profileId}")
    fun deleteByProfileId(@PathVariable profileId: Long):
            Mono<Void> = repository.deleteById(profileId)

    @DeleteMapping("/profile/{userId}")
    fun deleteAllByUser(@PathVariable userId: Long):
            Flux<Void> = repository.deleteByUserId(userId)
}