package proba.database.repository

import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import proba.model.Profile

@Repository
interface ProfileRepository: ReactiveCrudRepository<Profile, Long>