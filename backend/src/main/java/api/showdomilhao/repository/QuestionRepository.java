package api.showdomilhao.repository;

import api.showdomilhao.entity.Question;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends CrudRepository<Question, Long> {
    @Query("SELECT * FROM question WHERE question_id = :questionId AND deletion_date IS NULL")
    Optional<Question> findById(Long questionId);

    @Query("SELECT * FROM question WHERE user_account_id = :userId " +
            "AND accepted = :accepted")
    List<Question> findQuestionsByUserIdAndAccepted(Long userId, boolean accepted);
}
