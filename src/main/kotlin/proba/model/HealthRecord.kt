package proba.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDate

@Table
data class HealthRecord(@Id val id: Long?, var profileId: Long?,
                        var measurementName: String, var value: Double,
                        var date: LocalDate)