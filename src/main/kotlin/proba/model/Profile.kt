package proba.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDateTime

@Table
data class Profile(@Id val id:Long?, var firstName: String,
                   var lastName: String, var birthDate: LocalDateTime,
                   var weight: Double, var height: Double,
                   var personalObservation: String)
