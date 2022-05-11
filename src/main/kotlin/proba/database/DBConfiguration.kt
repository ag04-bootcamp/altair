package proba.database

import org.springframework.context.annotation.Configuration
import org.springframework.r2dbc.core.DatabaseClient

@Configuration
open class DBConfiguration(db: DatabaseClient) {
    init {
        val initDb = db.sql {
            """ CREATE TABLE IF NOT EXISTS profile (
                    id SERIAL PRIMARY KEY,
                    first_name VARCHAR(20) NOT NULL,
                    last_name VARCHAR(20) NOT NULL,
                    birth_date TIMESTAMP NOT NULL
                );
                CREATE TABLE IF NOT EXISTS health_record(
                    id SERIAL PRIMARY KEY,
                    profile_id INTEGER NOT NULL,
                    temperature DECIMAL NOT NULL,
                    blood_pressure DECIMAL NOT NULL,
                    heart_rate DECIMAL NOT NULL,
                    date TIMESTAMP NOT NULL
                );
            """
        }
        initDb.then().subscribe()
    }
}