package api.showdomilhao.service;

import api.showdomilhao.dto.QuestionDTO;
import api.showdomilhao.entity.Answer;
import api.showdomilhao.entity.Question;
import api.showdomilhao.entity.QuestionAnswer;
import api.showdomilhao.exceptionHandler.exceptions.MessageNotFoundException;
import api.showdomilhao.repository.AnswerRepository;
import api.showdomilhao.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepository repository;
    @Autowired
    private AnswerRepository answerRepository;

    @Transactional(readOnly = true)
    public List<Question> findQuestionsByUserIdAndAccepted(Long userId, boolean accepted){
        return repository.findQuestionsByUserIdAndAccepted(userId, accepted);
    }

    @Transactional(readOnly = true)
    public Optional<Question> findQuestionById(Long questionId){
        return repository.findById(questionId);
    }

    @Transactional
    public void addQuestion(QuestionDTO newQuestion) {
        Set<QuestionAnswer> answers = new HashSet<>();
        newQuestion.getAnswers().forEach(x -> {
            Answer answer = new Answer();
            answer.setDescription(x.getDescription());
            answer.setCorrect(x.isCorrect());
            answerRepository.save(answer);
            answers.add(new QuestionAnswer(x.getAnswerId()));
        });

        Question question = new Question();
        question.setUserAccountId(newQuestion.getUserAccountId());
        question.setStatement(newQuestion.getStatement());
        question.setAmountApprovals(0);
        question.setAmountComplaints(0);
        question.setAccepted(false);
        question.setAnswers(answers);
        repository.save(question);

        //criar tabela auxiliar entre usuario e pergunta para 5 usuarios fazer a validação
    }

    @Transactional
    public void updateQuestion(QuestionDTO newQuestion) {
        newQuestion.getAnswers().forEach(x -> {
            Optional<Answer> answer = Optional.ofNullable(answerRepository.findById(x.getAnswerId())
                    .orElseThrow(() -> {
                        throw new MessageNotFoundException("Res,posta da pergunta não encontrada na base");
                    }));
            answer.get().setDescription(x.getDescription());
            answer.get().setCorrect(x.isCorrect());
            answerRepository.save(answer.get());
        });

        Optional<Question> question = Optional.ofNullable(repository.findById(newQuestion.getQuestionId())
                .orElseThrow(() -> {
                    throw new MessageNotFoundException("Pergunta não encontrada na base");
                }));
        question.get().setStatement(newQuestion.getStatement());
        question.get().setAmountApprovals(0);
        question.get().setAmountComplaints(0);
        question.get().setAccepted(false);
        repository.save(question.get());

        //criar tabela auxiliar entre usuario e pergunta para 5 usuarios fazer a validação
    }

    @Transactional
    public void deleteQuestion(Long questionId){
        Optional<Question> question = Optional.ofNullable(repository.findById(questionId)
                .orElseThrow(() -> {
                    throw new MessageNotFoundException("Pergunta não encontrada na base");
                }));
        question.get().setDeletionDate(LocalDateTime.now());
        repository.save(question.get());
    }

    @Transactional
    public void reportQuestion(Long questionId){
        Optional<Question> question = Optional.ofNullable(repository.findById(questionId)
                .orElseThrow(() -> {
                    throw new MessageNotFoundException("Pergunta não encontrada na base");
                }));

        int reports = question.get().getAmountComplaints()+1;

        if (reports < 2)
            question.get().setAmountComplaints(reports);
        else{
            question.get().setAmountApprovals(0);
            question.get().setAmountComplaints(0);
            question.get().setAccepted(false);

            //ser enviada para 5 usuarios revisar
        }

        repository.save(question.get());
    }
}
