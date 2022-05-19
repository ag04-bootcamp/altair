package proba.controllers

import org.springframework.web.bind.annotation.*
import proba.model.Users
import proba.service.UsersService
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
class UsersController(private val service: UsersService) {

    @PostMapping("/users")
    fun save(@RequestBody users: Users): Mono<Users> =
        service.saveUser(users)

    @GetMapping("/users")
    fun getAllUsers(): Flux<Users> =
        service.getAllUsers()

    @GetMapping("/users/{userId}")
    fun getById(@PathVariable userId: Long):
            Mono<Users> = service.getUserById(userId)

    @DeleteMapping("/users/{userId}")
    fun deleteById(@PathVariable userId: Long):
            Mono<Void> = service.deleteUser(userId)
}