package api.showdomilhao.service;

import api.showdomilhao.dto.HallDaFamaDTO;
import api.showdomilhao.dto.UserAccountDTO;
import api.showdomilhao.entity.Login;
import api.showdomilhao.entity.Role;
import api.showdomilhao.entity.UserAccount;
import api.showdomilhao.exceptionHandler.exceptions.MessageBadRequestException;
import api.showdomilhao.exceptionHandler.exceptions.MessageNotFoundException;
import api.showdomilhao.repository.LoginRepository;
import api.showdomilhao.repository.RoleRepository;
import api.showdomilhao.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserAccountService {
    @Autowired
    private UserAccountRepository repository;
    @Autowired
    private LoginRepository loginRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public Optional<UserAccount> findById(Long id){
        return Optional.ofNullable(repository.findById(id).orElseThrow(() -> {
            throw new MessageNotFoundException("Usuário não encontrado");
        }));
    }

    @Transactional
    public void addUserAccount(UserAccountDTO newUserAccount) {
        Optional<UserAccount> userAccount = repository.findUserByNickname(newUserAccount.getNickname());
        if (userAccount.isPresent())
            throw new MessageBadRequestException("Usuário já existe");

        userAccount = Optional.of(new UserAccount());
        userAccount.get().setName(newUserAccount.getName());
        userAccount.get().setNickname(newUserAccount.getNickname());
        repository.save(userAccount.get());

        Login login = new Login();
        login.setUserAccountId(userAccount.get().getUserAccountId());
        login.setNickname(userAccount.get().getNickname());
        login.setPassword(passwordEncoder.encode(newUserAccount.getPassword()));
        loginRepository.save(login);

        Role role = new Role();
        role.setName("USER");
        role.setLogin_id(login.getLoginId());
        roleRepository.save(role);

        Set<Role> roles = new HashSet<>();
        roles.add(role);

        login.setRoles(roles);
    }

    @Transactional
    public void updateUserById(Long id, UserAccountDTO newUserAccount) {
        Optional<UserAccount> userAccount = Optional.ofNullable(repository.findById(id).orElseThrow(() -> {
            throw new MessageNotFoundException("Usuário não encontrado");
        }));

        Optional<Login> login = Optional.of(loginRepository.findByNickname(userAccount.get().getNickname()).orElseThrow(() -> {
            throw new MessageNotFoundException("Usuário não encontrado");
        }));

        if (!newUserAccount.getName().isBlank())
            userAccount.get().setName(newUserAccount.getName());
        if (!newUserAccount.getNickname().isBlank() && repository.findUserByNickname(newUserAccount.getNickname()).isEmpty())
            userAccount.get().setNickname(newUserAccount.getNickname());
        repository.save(userAccount.get());

        if (!newUserAccount.getNickname().isBlank())
            login.get().setNickname(userAccount.get().getNickname());
        if (!newUserAccount.getPassword().isBlank())
            login.get().setPassword(passwordEncoder.encode(newUserAccount.getPassword()));
        loginRepository.save(login.get());
    }

    @Transactional
    public void deleteUserById(Long id) {
        Optional<UserAccount> userAccount = Optional.ofNullable(repository.findById(id).orElseThrow(() -> {
            throw new MessageNotFoundException("Usuário não encontrado");
        }));

        Optional<Login> login = Optional.of(loginRepository.findByNickname(userAccount.get().getNickname()).orElseThrow(() -> {
            throw new MessageNotFoundException("Usuário não encontrado");
        }));

        userAccount.get().setDeletionDate(LocalDateTime.now());
        login.get().setDeletionDate(LocalDateTime.now());

        repository.save(userAccount.get());
        loginRepository.save(login.get());
    }

    @Transactional(readOnly = true)
    public List<HallDaFamaDTO> getHalldaFama() {
        return repository.findHallDaFama();
    }
}
