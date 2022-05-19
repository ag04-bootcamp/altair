package proba.controllers

import org.springframework.web.bind.annotation.*
import proba.model.Profile
import proba.service.ProfileService
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
class ProfileController(private val service: ProfileService) {

    @PostMapping("/profile")
    fun save(@RequestBody
             profile: Profile): Mono<Profile> = service.save(profile)

    @GetMapping("/profile/user")
    fun getAllProfilesForUser(@RequestParam userId: Long): Flux<Profile> =
        service.getAllForUser(userId)

    @GetMapping("/profile")
    fun getAll(): Flux<Profile> =
        service.getAllProfiles()

    @GetMapping("/profile/{profileId}")
    fun getProfile(@PathVariable profileId: Long):
            Mono<Profile> = service.getById(profileId)

    @DeleteMapping("/profile/{profileId}")
    fun deleteByProfileId(@PathVariable profileId: Long):
            Mono<Void> = service.deleteProfile(profileId)

    @DeleteMapping("/profile/{userId}")
    fun deleteAllByUser(@PathVariable userId: Long):
            Mono<Void> = service.deleteAllUserProfiles(userId)
}