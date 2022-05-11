package proba.controllers

import org.springframework.format.annotation.DateTimeFormat
import org.springframework.stereotype.Repository
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
}