package altair.service

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.core.io.ByteArrayResource
import org.springframework.core.io.FileSystemResource
import org.springframework.core.io.Resource
import org.springframework.http.codec.multipart.FilePart
import org.springframework.stereotype.Service
import altair.model.FileModel
import org.springframework.util.FileSystemUtils
import reactor.core.publisher.Mono
import java.io.ByteArrayOutputStream
import java.io.File
import java.nio.file.Path
import java.nio.file.Paths
import javax.annotation.PostConstruct
import kotlin.io.path.Path

@Service
class FileService {
    private val basePathString = "./resources/"
    private val basePath: Path = Paths.get(basePathString)

    @PostConstruct
    fun init() {
        createDirectoryIfNotExists()
    }

    private fun String.buildPath(): String {
        return this
            .replace(Regex("(/){2,}"), "/")
            .dropWhile { it == '/' }
            .dropLastWhile { it == '/' }
    }

    private fun fileExists(localPath: String = ""): Pair<Boolean, File> {
        val path = basePathString + localPath
        val file = File(path.buildPath())
        if (!file.exists()) {
            return Pair(false, file)
        }
        return Pair(true, file)
    }

    private fun createDirectoryIfNotExists(localPath: String = "") {
        val (exists, file) = fileExists(localPath)
        if (!exists) {
            file.mkdir()
            if (localPath == "") println("Creating resources directory... ")
        }
    }

    private fun createDirectories(path: String) {
        val dirs = path.split("/")
        dirs.forEachIndexed { index, _ ->
            createDirectoryIfNotExists((dirs.subList(0, index + 1).joinToString("/")))
        }
    }

    fun deleteFile(path: String): Boolean {
        return FileSystemUtils.deleteRecursively(Path("$basePathString${path.buildPath()}"))
    }

    // returns exists, success
    fun renameFile(path: String, newName: String): Pair<Boolean, Boolean> {
        var file = File("$basePathString${path.buildPath()}")
        if (!file.exists()) {
            return Pair(false, false)
        }
        val newFilePath = path.split("/").dropLast(1).joinToString("/") + "/$newName"
        var newFile = File("$basePathString$newFilePath")
        if (newFile.exists()) {
            return Pair(true, false)
        }
        return Pair(true, file.renameTo(newFile))
    }

    fun saveFile(path: String, file: FilePart): Mono<Unit> {
        createDirectoryIfNotExists()
        createDirectories(path.buildPath())
        return file.transferTo(Path("$basePath/$path/${file.filename()}")).map {}
    }

    //Triple(isFound, isFile, Resource)
    fun findFile(pathReq: String): Triple<Boolean, Boolean, Mono<Resource>?> {
        val path = pathReq.buildPath()

        //if only directory is sent create it in case it is first time that user wants to get files
        if (path.split("/").size == 1) {
            createDirectoryIfNotExists(path)
        }

        val (exists, file) = fileExists(path)
        if (!exists) return Triple(false, false, null)
        if (file.isFile) {
            return Triple(true, true, Mono.just(FileSystemResource(file)))
        }

        val filesInDir = file.listFiles()
        val files = mutableListOf<FileModel>()
        for (f in filesInDir!!) {
            if (f.isFile) files.add(FileModel(true, f.name, "${path.buildPath()}${f.name}"))
            else files.add(FileModel(false, f.name, "${path.buildPath()}${f.name}"))
        }
        val out = ByteArrayOutputStream()
        val mapper = ObjectMapper()
        mapper.writeValue(out, files)

        return Triple(true, false, Mono.just(ByteArrayResource(out.toByteArray())))
    }

    fun createDir(pathReq: String) {
        createDirectories(pathReq.buildPath())
    }
}