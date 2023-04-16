CREATE TABLE role (
	role_id TINYINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	login_id BIGINT NOT NULL,
	name VARCHAR(50) NOT NULL
) ENGINE = innodb;

CREATE TABLE login (
	login_id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_account_id BIGINT NOT NULL,
	nickname VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL,
    deletion_date DATE NULL
) ENGINE = innodb;

CREATE TABLE user_account (
	user_account_id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250) NOT NULL,
	nickname VARCHAR(250) NOT NULL,
    avatar VARCHAR(250) NULL,
    deletion_date DATE NULL
) ENGINE = innodb;

ALTER TABLE role ADD CONSTRAINT fk_role_login_id FOREIGN KEY(login_id) REFERENCES login(login_id);
ALTER TABLE login ADD CONSTRAINT fk_login_user_account_id FOREIGN KEY(user_account_id) REFERENCES user_account(user_account_id);

CREATE TABLE question (
	question_id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_account_id BIGINT NOT NULL,
	statement VARCHAR(250) NOT NULL,
    accepted bit NOT NULL,
	amount_approvals TINYINT NOT NULL,
	amount_complaints TINYINT NOT NULL,
    deletion_date DATE NULL
) ENGINE = innodb;

ALTER TABLE question ADD CONSTRAINT fk_question_user_account_id FOREIGN KEY(user_account_id) REFERENCES user_account(user_account_id);

CREATE TABLE answer (
	answer_id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    description VARCHAR(250) NOT NULL,
	correct bit NOT NULL
) ENGINE = innodb;

CREATE TABLE question_answer (
	question_id BIGINT NOT NULL,
	answer_id BIGINT NOT NULL
) ENGINE = innodb;

ALTER TABLE question_answer ADD CONSTRAINT fk_question_answer_question_id FOREIGN KEY(question_id) REFERENCES question(question_id);
ALTER TABLE question_answer ADD CONSTRAINT fk_question_answer_answer_id FOREIGN KEY(answer_id) REFERENCES answer(answer_id);

CREATE TABLE validation_question_user (
	user_account_id BIGINT NOT NULL,
	question_id BIGINT NOT NULL
) ENGINE = innodb;

ALTER TABLE validation_question_user ADD CONSTRAINT fk_validation_question_user_question_id FOREIGN KEY(question_id) REFERENCES question(question_id);
ALTER TABLE validation_question_user ADD CONSTRAINT fk_validation_question_user_user_account_id FOREIGN KEY(user_account_id) REFERENCES user_account(user_account_id);
