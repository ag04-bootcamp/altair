package proba.service

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.core.io.ByteArrayResource
import org.springframework.core.io.FileSystemResource
import org.springframework.core.io.Resource
import org.springframework.http.codec.multipart.FilePart
import org.springframework.stereotype.Service
import proba.model.FileModel
import reactor.core.publisher.Mono
import reactor.core.publisher.toMono
import java.io.BufferedOutputStream
import java.io.ByteArrayOutputStream
import java.io.File
import java.nio.file.Path
import java.nio.file.Paths
import javax.annotation.PostConstruct

@Service
class FileService {
    private val basePathString = "./resources"
    private val basePath: Path = Paths.get(basePathString)

    @PostConstruct
    fun init() {
        createDirectoryIfNotExists()
    }

    private fun createDirectoryIfNotExists(localPath: String = "") {
        val path = basePathString + localPath
        val directory = File(path)
        if (!directory.exists()) {
            if (localPath == "") println("Creating resources directory... ")
            directory.mkdir();
        }
    }

    private fun createDirectories(dirs: List<String>) {
        dirs.forEachIndexed { index, _ ->
            createDirectoryIfNotExists("/" + (dirs.subList(0, index + 1).joinToString("/")))
        }
    }

    fun saveFile(path: String, file: FilePart): Mono<Unit> {
        createDirectories(path.split("/"))
        return file.transferTo(basePath.resolve("$path/${file.filename()}"))
            .map { it }
    }

    fun findFile(path: String): Mono<Resource> {
        var file = File("$basePathString/$path")
        if(file.isFile){
            return Mono.just(FileSystemResource(file))
        }
        // it is directory
        val filesInDir = file.listFiles()
        var files = mutableListOf<FileModel>()
        for (file in filesInDir){
            if(file.isFile) {
                files.add(FileModel(true, file.name, "$path/${file.name}"))
                break
            }
            files.add(FileModel(false, file.name, "$path/${file.name}"))
        }
        var out = ByteArrayOutputStream()
        var mapper = ObjectMapper()
        mapper.writeValue(out, files)

        return Mono.just(ByteArrayResource(out.toByteArray()))

    }
}