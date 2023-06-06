package api.showdomilhao.controller;

import api.showdomilhao.dto.HallDaFamaDTO;
import api.showdomilhao.dto.UserAccountDTO;
import api.showdomilhao.entity.UserAccount;
import api.showdomilhao.exceptionHandler.MessageExceptionHandler;
import api.showdomilhao.service.UserAccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;

@Tag(name = "Usuário")
@RestController
@RequestMapping("/api/user")
public class UserAccountController {
    @Autowired
    private UserAccountService service;

    @Operation(summary = "Buscar usuário pelo ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Buscou usuário", content =
            @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = UserAccount.class)))),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado", content =
            @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = MessageExceptionHandler.class))))
    })
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<Optional<UserAccount>> getUserById(@PathVariable Long id) throws Exception{
        try {
            Optional<UserAccount> user = service.findById(id);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }catch (Exception e){
            throw new Exception(e);
        }
    }

    @Operation(summary = "Adicionar novo usuário")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Usuário criado", content = { @Content }),
            @ApiResponse(responseCode = "400", description = "Usuário já existe", content =
            @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = MessageExceptionHandler.class))))
    })
    @PostMapping
    public ResponseEntity addUser(@RequestBody UserAccountDTO newUser) throws Exception{
        try {
            service.addUserAccount(newUser);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch (Exception e){
            throw new Exception(e);
        }
    }

    @Operation(summary = "Editar usuário pelo ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Usuário editado", content = { @Content }),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado", content =
            @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = MessageExceptionHandler.class))))
    })
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity updateUser(@PathVariable Long id, @RequestBody UserAccountDTO newUser) throws Exception{
        try {
            service.updateUserById(id, newUser);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception e){
            throw new Exception(e);
        }
    }

    @Operation(summary = "Apagar usuário pelo ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Usuário apagado", content = { @Content }),
            @ApiResponse(responseCode = "404", description = "Usuário não encontrado", content =
            @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = MessageExceptionHandler.class))))
    })
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity deleteUser(@PathVariable Long id) throws Exception{
        try {
            service.deleteUserById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception e){
            throw new Exception(e);
        }
    }

    @Operation(summary = "Retorna os 10 melhores usuários")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Buscou o Hall da Fama", content =
            @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = UserAccount.class)))),
            @ApiResponse(responseCode = "404", description = "Hall da Fama vazio", content =
            @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = MessageExceptionHandler.class))))
    })
    @GetMapping("/hall-da-fama")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public ResponseEntity<List<HallDaFamaDTO>> getHalldaFama() throws Exception{
        try {
            List<HallDaFamaDTO> hallDaFama = service.getHalldaFama();
            return new ResponseEntity<>(hallDaFama, HttpStatus.OK);
        }catch (Exception e){
            throw new Exception(e);
        }
    }
}
