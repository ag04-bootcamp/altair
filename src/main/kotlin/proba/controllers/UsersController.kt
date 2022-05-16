package proba.controllers

import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import proba.database.repository.UsersRepository
import proba.model.Users
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
class UsersController(val repository: UsersRepository) {

    @PostMapping("/users")
    fun save(@RequestBody users: Users): Mono<Users> =
        repository.save(users)

    @GetMapping("/users")
    fun getAllUsers(): Flux<Users> =
        repository.findAll()

    @GetMapping("/users/{userId}")
    fun getById(@PathVariable userId: Long):
            Mono<Users> = repository.findById(userId)

    @DeleteMapping("/users/{userId}")
    fun deleteById(@PathVariable userId: Long):
            Mono<Void> = repository.deleteById(userId)
}