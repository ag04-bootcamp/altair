package altair.service

import org.springframework.stereotype.Service
import altair.database.repository.UsersRepository
import altair.model.Users
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Service
class UsersService(private val repository: UsersRepository) {

    fun saveUser(user: Users): Mono<Users> =
        repository.save(user)

    fun getAllUsers(): Flux<Users> =
        repository.findAll()

    fun getUserById(id: Long): Mono<Users> =
        repository.findById(id)

    fun deleteUser(id: Long): Mono<Void> =
        repository.deleteById(id)
}