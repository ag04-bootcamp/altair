package proba.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.FileSystemResource
import org.springframework.core.io.Resource
import org.springframework.http.MediaType
import org.springframework.http.codec.multipart.FilePart
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestPart
import org.springframework.web.bind.annotation.RestController
import proba.service.FileService
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@RestController
class FileController {
    @Autowired
    private lateinit var fileService: FileService

    private fun String.normalize(): String{
        return this.drop(1)
    }
    @PostMapping("file/{*path}")
    fun upload(
        @PathVariable path: String,
        @RequestPart("files") filesFlux: Flux<FilePart>
    ): Mono<String> {
        return filesFlux
            .flatMap { file -> fileService.saveFile(path.normalize(), file) }
            .then(Mono.just("Resource successfully created"))
    }

    @PostMapping("file/folder")
    fun createFolder(
        @RequestPart("userId") userIdMono: Mono<String>,
        @RequestPart("path") pathMono: Mono<String>
    ) {
        TODO()
    }

    @GetMapping("file/{*path}", produces = [MediaType.APPLICATION_OCTET_STREAM_VALUE])
    fun getFile(
        @PathVariable path: String
    ): Mono<Resource> {
        return fileService.findFile(path.normalize())
    }
}