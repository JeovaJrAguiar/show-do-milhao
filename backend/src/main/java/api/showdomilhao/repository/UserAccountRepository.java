package api.showdomilhao.repository;

import api.showdomilhao.entity.UserAccount;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserAccountRepository extends CrudRepository<UserAccount, Long> {
    @Query("SELECT * FROM user_account WHERE nickname = :nickname AND deletion_date IS NULL")
    Optional<UserAccount> findUserByNickname(String nickname);

    @Query("SELECT * FROM user_account WHERE user_account_id = :id AND deletion_date IS NULL")
    Optional<UserAccount> findById(Long id);
}
