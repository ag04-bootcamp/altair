package proba.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import proba.database.repository.ProfileRepository
import proba.model.Profile
import reactor.core.publisher.Mono

@RestController
class ProfileController(val repository: ProfileRepository) {

    @PostMapping("/profile")
    fun save(@RequestBody
             profile: Profile): Mono<Profile> = repository.save(profile)

    @GetMapping("/profile/{profileId}")
    fun getProfile(@PathVariable profileId: Long):
            Mono<Profile> = repository.findById(profileId)
}