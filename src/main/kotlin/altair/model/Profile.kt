package altair.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDate

@Table
data class Profile(@Id val id:Long?, val userId: Long,
                   var weight: Double, var height: Double,
                   var personalObservation: String,
                   var date: LocalDate
                   )
