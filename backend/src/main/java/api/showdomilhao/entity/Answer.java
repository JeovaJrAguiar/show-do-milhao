package api.showdomilhao.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
public class Answer {

    @Id
    private Long answerId;
    private String description;
    private boolean correct;

    public Answer(){}
}
