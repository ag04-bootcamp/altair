package proba.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDateTime

@Table
data class Users(@Id val id: Long?, var firstName: String,
                 var lastName: String, var birthDate: LocalDateTime,
                 var email: String, var userName: String,
                 var password: String
                )
