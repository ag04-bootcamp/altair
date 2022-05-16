package proba.database

import org.springframework.context.annotation.Configuration
import org.springframework.r2dbc.core.DatabaseClient

@Configuration
open class DBConfiguration(db: DatabaseClient) {
    init {
        val initDb = db.sql {
            """ CREATE TABLE IF NOT EXISTS profile(
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER NOT NULL,
                    weight DECIMAL NOT NULL,
                    height DECIMAL NOT NULL,
                    personal_observation VARCHAR(200)
                );
                CREATE TABLE IF NOT EXISTS measurement(
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(20) NOT NULL
                );
                CREATE TABLE IF NOT EXISTS health_record(
                    id SERIAL PRIMARY KEY,
                    profile_id INTEGER NOT NULL,
                    measurement_name VARCHAR(20) NOT NULL,
                    value DECIMAL NOT NULL,
                    date TIMESTAMP NOT NULL
                );
                CREATE TABLE IF NOT EXISTS users(
                    id SERIAL PRIMARY KEY,
                    first_name VARCHAR(20) NOT NULL,
                    last_name VARCHAR(20) NOT NULL,
                    birth_date TIMESTAMP NOT NULL,
                    email VARCHAR(40) NOT NULL,
                    user_name VARCHAR(20) NOT NULL,
                    password VARCHAR(20) NOT NULL
                );
            """
        }
        initDb.then().subscribe()
    }
}