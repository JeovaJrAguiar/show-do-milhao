package api.showdomilhao.controller;

import api.showdomilhao.dto.QuestionDTO;
import api.showdomilhao.entity.Question;
import api.showdomilhao.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/question")
public class QuestionController {
    @Autowired
    private QuestionService service;

    @GetMapping("/{questionId}")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    private ResponseEntity<Optional<Question>> findById(@PathVariable Long questionId) throws Exception{
        try {
            Optional<Question> question = service.findQuestionById(questionId);
            return new ResponseEntity<>(question, HttpStatus.OK);
        }catch (Exception ex){
            throw new Exception(ex);
        }
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    private ResponseEntity<List<Question>> findQuestionsByUserIdAndAccepted(@RequestParam Long userId, @RequestParam boolean accepted) throws Exception{
        try {
            List<Question> questions = service.findQuestionsByUserIdAndAccepted(userId, accepted);
            return new ResponseEntity<>(questions, HttpStatus.OK);
        }catch (Exception ex){
            throw new Exception(ex);
        }
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    private ResponseEntity<List<Question>> findQuestionsToApprovals(@PathVariable Long userId) throws Exception{
        try {
            List<Question> questions = service.findQuestionsToApprovals(userId);
            return new ResponseEntity<>(questions, HttpStatus.OK);
        }catch (Exception ex){
            throw new Exception(ex);
        }
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    private ResponseEntity addQuestion(@RequestParam QuestionDTO question) throws Exception{
        try {
              service.addQuestion(question);
              return new ResponseEntity<>(HttpStatus.CREATED);
        }catch (Exception ex){
            throw new Exception(ex);
        }
    }

    @PutMapping
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    private ResponseEntity updateQuestion(@RequestParam QuestionDTO question) throws Exception{
        try {
            service.updateQuestion(question);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception ex){
            throw new Exception(ex);
        }
    }

    @PutMapping("/{questionId}")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    private ResponseEntity updateQuestion(@PathVariable Long questionId, @RequestParam boolean isReport,
                                          @RequestParam Long userId, @RequestParam boolean approve) throws Exception{
        try {
            if (isReport)
                service.reportQuestion(questionId);
            else
                service.approveQuestion(questionId, userId, approve);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception ex){
            throw new Exception(ex);
        }
    }

    @DeleteMapping("/{questionId}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    private ResponseEntity deleteQuestion(@PathVariable Long questionId) throws Exception{
        try {
            service.deleteQuestion(questionId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception ex){
            throw new Exception(ex);
        }
    }
}
