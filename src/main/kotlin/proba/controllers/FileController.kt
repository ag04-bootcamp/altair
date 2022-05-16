package proba.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.codec.multipart.FilePart
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

    @PostMapping("file/upload")
    fun upload(
        @RequestPart("userId") userIdMono: Mono<String>,
        @RequestPart("files") filesFlux: Flux<FilePart>
    ): Mono<String> {
        var userId = ""
        userIdMono.subscribe { str -> userId = str }
        return filesFlux
            .doOnNext { file -> println(file.filename()) }
            .flatMap { file -> fileService.saveFile(userId, file) }
            .then(Mono.just("Resource successfully created"))
    }
}