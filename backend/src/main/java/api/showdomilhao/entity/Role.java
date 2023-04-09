package api.showdomilhao.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.security.core.GrantedAuthority;

@Getter
@Setter
public class Role implements GrantedAuthority {

    @Id
    private Long roleId;
    private String name;
    Long login_id;

    @Override
    public String getAuthority() {
        return name;
    }
}