package proba.database

import org.springframework.context.annotation.Configuration
import org.springframework.r2dbc.core.DatabaseClient

@Configuration
open class DBConfiguration(db: DatabaseClient) {
    init {
        val initDb = db.sql {
            """ CREATE TABLE IF NOT EXISTS profile (
                    id SERIAL PRIMARY KEY,
                    firstName VARCHAR(20) NOT NULL,
                    lastName VARCHAR(20) NOT NULL,
                    birthDate TIMESTAMP NOT NULL
                );
                CREATE TABLE IF NOT EXISTS health_record(
                    id SERIAL PRIMARY KEY,
                    profile_id INTEGER NOT NULL,
                    temperature DECIMAL NOT NULL,
                    bloodPressure DECIMAL NOT NULL,
                    heartRate DECIMAL NOT NULL,
                    date TIMESTAMP NOT NULL
                );
            """
        }
        initDb.then().subscribe()
    }
}