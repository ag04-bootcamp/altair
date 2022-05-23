package altair.controllers

import altair.service.FileService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.Resource
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.http.codec.multipart.FilePart
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
class FileController {
    @Autowired
    private lateinit var fileService: FileService

    @PostMapping(
        "file/{*path}",
        consumes = [MediaType.MULTIPART_FORM_DATA_VALUE],
        produces = [MediaType.TEXT_PLAIN_VALUE]
    )
    fun upload(
        @PathVariable path: String,
        @RequestPart("files") filesFlux: Flux<FilePart>
    ): Mono<String> {
        return filesFlux
            .flatMap { file -> fileService.saveFile(path, file) }
            .then(Mono.just("Resource successfully created"))
    }

    @PostMapping("file/dir/{*path}", produces = [MediaType.TEXT_PLAIN_VALUE])
    fun createDirectory(
        @PathVariable path: String,
    ): ResponseEntity<String> {
        fileService.createDir(path)
        return ResponseEntity.ok("Directory successfully created")
    }

    @DeleteMapping("file/{*path}", produces = [MediaType.TEXT_PLAIN_VALUE])
    fun deleteFile(
        @PathVariable path: String,
    ): ResponseEntity<String> {
        val deleted = fileService.deleteFile(path)
        return if (deleted) ResponseEntity.ok("Resource successfully removed")
        else ResponseEntity.status(404).body("Does not exist")
    }

    @PutMapping("file/{*path}", produces = [MediaType.TEXT_PLAIN_VALUE])
    fun renameFile(
        @PathVariable path: String,
        @RequestPart newName: String
    ): ResponseEntity<String> {
        val (exist, success) = fileService.renameFile(path, newName)
        return if (!exist) ResponseEntity.status(404).body("File not found")
        else if (!success) ResponseEntity.status(400).body("Name already exist")
        else ResponseEntity.ok("Resource successfully renamed")

    }


    @GetMapping(
        "file/{*path}",
        produces = [MediaType.APPLICATION_OCTET_STREAM_VALUE, MediaType.APPLICATION_JSON_VALUE]
    )
    fun getFile(
        @PathVariable path: String,
    ): ResponseEntity<Mono<Resource>?> {
        if (path == "" || path == "/") return ResponseEntity.badRequest().body(null)
        val (isFound, isFile, resource) = fileService.findFile(path)
        if (!isFound) return ResponseEntity.badRequest().body(null)
        var contentType = MediaType.APPLICATION_OCTET_STREAM_VALUE
        if (!isFile) contentType = MediaType.APPLICATION_JSON_VALUE
        return ResponseEntity.ok()
            .header("Content-Type", contentType)
            .body(resource)
    }
}