package proba.service

import org.springframework.http.codec.multipart.FilePart
import org.springframework.stereotype.Service
import reactor.core.publisher.Mono
import java.io.File
import java.nio.file.Path
import java.nio.file.Paths
import javax.annotation.PostConstruct

@Service
class FileService {
    private val basePathString = "./uploads"
    private val basePath: Path = Paths.get(basePathString)

    @PostConstruct
    fun init() {
        createDirectoryIfNotExists()
    }

    private fun createDirectoryIfNotExists(localPath: String = "") {
        val path = basePathString + localPath
        val directory = File(path)
        if (!directory.exists()) {
            if (localPath == "") println("Creating uploads directory... ")
            directory.mkdir();
        }
    }

    fun saveFile(userId: String, file: FilePart): Mono<Unit> {
        createDirectoryIfNotExists("/$userId")
        return file.transferTo(basePath.resolve("$userId/${file.filename()}"))
            .map { it }
    }
}