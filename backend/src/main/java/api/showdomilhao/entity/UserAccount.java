package api.showdomilhao.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserAccount {

    @Id
    private Long userAccountId;
    private String nickname;
    private String name;
    private String avatar;
    private LocalDateTime deletionDate;

    public UserAccount(){}
}
