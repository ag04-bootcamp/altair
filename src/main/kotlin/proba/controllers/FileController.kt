package proba.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.Resource
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.http.codec.multipart.FilePart
import org.springframework.web.bind.annotation.*
import proba.service.FileService
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
    fun createFolder(
        @PathVariable path: String,
    ): ResponseEntity<String> {
        fileService.saveDir(path)
        return ResponseEntity.ok("Directory successfully created")
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