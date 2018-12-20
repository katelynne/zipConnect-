SET DB_CLOSE_DELAY -1;         
;              
CREATE USER IF NOT EXISTS ZIPCONNECT SALT '791b2ef2581e3748' HASH '40394715a88a697e746b148477d4fb5f05837d47e0d2757fc55c960ef8b39fce' ADMIN;    
CREATE SEQUENCE PUBLIC.SYSTEM_SEQUENCE_05BAF210_F502_4348_B72D_30B4760D1D03 START WITH 1 BELONGS_TO_TABLE;     
CREATE SEQUENCE PUBLIC.SYSTEM_SEQUENCE_B49B1531_1AC3_4339_BF47_BF8C89C85F3B START WITH 1 BELONGS_TO_TABLE;     
CREATE SEQUENCE PUBLIC.SYSTEM_SEQUENCE_69E8117E_547D_4FA0_B4B8_7D61F900115C START WITH 1 BELONGS_TO_TABLE;     
CREATE SEQUENCE PUBLIC.SYSTEM_SEQUENCE_A973D896_49E9_4108_9EB2_04CCBD2E46C1 START WITH 1 BELONGS_TO_TABLE;     
CREATE SEQUENCE PUBLIC.SYSTEM_SEQUENCE_99C30569_781F_4C20_9CE6_F20AA78F4C49 START WITH 5 BELONGS_TO_TABLE;     
CREATE SEQUENCE PUBLIC.SYSTEM_SEQUENCE_B2398558_7506_4144_82D4_6455E324C759 START WITH 1 BELONGS_TO_TABLE;     
CREATE SEQUENCE PUBLIC.SYSTEM_SEQUENCE_FECABC6A_D198_488F_B104_F7AA0724091D START WITH 1 BELONGS_TO_TABLE;     
CREATE MEMORY TABLE PUBLIC.DATABASECHANGELOGLOCK(
    ID INT NOT NULL,
    LOCKED BOOLEAN NOT NULL,
    LOCKGRANTED TIMESTAMP,
    LOCKEDBY VARCHAR(255)
);    
ALTER TABLE PUBLIC.DATABASECHANGELOGLOCK ADD CONSTRAINT PUBLIC.PK_DATABASECHANGELOGLOCK PRIMARY KEY(ID);       
-- 1 +/- SELECT COUNT(*) FROM PUBLIC.DATABASECHANGELOGLOCK;    
INSERT INTO PUBLIC.DATABASECHANGELOGLOCK(ID, LOCKED, LOCKGRANTED, LOCKEDBY) VALUES
(1, FALSE, NULL, NULL);     
CREATE MEMORY TABLE PUBLIC.DATABASECHANGELOG(
    ID VARCHAR(255) NOT NULL,
    AUTHOR VARCHAR(255) NOT NULL,
    FILENAME VARCHAR(255) NOT NULL,
    DATEEXECUTED TIMESTAMP NOT NULL,
    ORDEREXECUTED INT NOT NULL,
    EXECTYPE VARCHAR(10) NOT NULL,
    MD5SUM VARCHAR(35),
    DESCRIPTION VARCHAR(255),
    COMMENTS VARCHAR(255),
    TAG VARCHAR(255),
    LIQUIBASE VARCHAR(20),
    CONTEXTS VARCHAR(255),
    LABELS VARCHAR(255),
    DEPLOYMENT_ID VARCHAR(10)
);               
-- 8 +/- SELECT COUNT(*) FROM PUBLIC.DATABASECHANGELOG;        
INSERT INTO PUBLIC.DATABASECHANGELOG(ID, AUTHOR, FILENAME, DATEEXECUTED, ORDEREXECUTED, EXECTYPE, MD5SUM, DESCRIPTION, COMMENTS, TAG, LIQUIBASE, CONTEXTS, LABELS, DEPLOYMENT_ID) VALUES
('00000000000001', 'jhipster', 'config/liquibase/changelog/00000000000000_initial_schema.xml', TIMESTAMP '2018-12-20 15:11:06.045', 1, 'EXECUTED', '7:8eef49fe9846cf127a6c088e3d850cb0', 'createTable tableName=jhi_user; createTable tableName=jhi_authority; createTable tableName=jhi_user_authority; addPrimaryKey tableName=jhi_user_authority; addForeignKeyConstraint baseTableName=jhi_user_authority, constraintName=fk_authority_name, ...', '', NULL, '3.5.4', NULL, NULL, '5336665793'),
('20181217184612-1', 'jhipster', 'config/liquibase/changelog/20181217184612_added_entity_UserProfile.xml', TIMESTAMP '2018-12-20 15:11:06.06', 2, 'EXECUTED', '7:13d806ee806a475cdb828f90479e3da7', 'createTable tableName=user_profile', '', NULL, '3.5.4', NULL, NULL, '5336665793'),
('20181217184613-1', 'jhipster', 'config/liquibase/changelog/20181217184613_added_entity_Cohort.xml', TIMESTAMP '2018-12-20 15:11:06.066', 3, 'EXECUTED', '7:ab6218521729a91a6cf095e1cc219e6b', 'createTable tableName=cohort', '', NULL, '3.5.4', NULL, NULL, '5336665793'),
('20181217184614-1', 'jhipster', 'config/liquibase/changelog/20181217184614_added_entity_Employer.xml', TIMESTAMP '2018-12-20 15:11:06.07', 4, 'EXECUTED', '7:99bb184cef1922b8432114ff5615cd88', 'createTable tableName=employer', '', NULL, '3.5.4', NULL, NULL, '5336665793'),
('20181217184615-1', 'jhipster', 'config/liquibase/changelog/20181217184615_added_entity_Post.xml', TIMESTAMP '2018-12-20 15:11:06.074', 5, 'EXECUTED', '7:68b618230d8b4175f9c3fee15771054a', 'createTable tableName=post', '', NULL, '3.5.4', NULL, NULL, '5336665793'),
('20181217184616-1', 'jhipster', 'config/liquibase/changelog/20181217184616_added_entity_Privacy.xml', TIMESTAMP '2018-12-20 15:11:06.08', 6, 'EXECUTED', '7:2691075ffa5856c7404712dc50f51248', 'createTable tableName=privacy', '', NULL, '3.5.4', NULL, NULL, '5336665793'),
('20181217184612-2', 'jhipster', 'config/liquibase/changelog/20181217184612_added_entity_constraints_UserProfile.xml', TIMESTAMP '2018-12-20 15:11:06.091', 7, 'EXECUTED', '7:4265c77c4003ac55e132296cff70529b', 'addForeignKeyConstraint baseTableName=user_profile, constraintName=fk_user_profile_user_id, referencedTableName=jhi_user; addForeignKeyConstraint baseTableName=user_profile, constraintName=fk_user_profile_employer_id, referencedTableName=employer;...', '', NULL, '3.5.4', NULL, NULL, '5336665793'),
('20181217184615-2', 'jhipster', 'config/liquibase/changelog/20181217184615_added_entity_constraints_Post.xml', TIMESTAMP '2018-12-20 15:11:06.1', 8, 'EXECUTED', '7:7d0aed241b1359d2a465be6011b4109e', 'addForeignKeyConstraint baseTableName=post, constraintName=fk_post_poster_id, referencedTableName=user_profile; addForeignKeyConstraint baseTableName=post, constraintName=fk_post_privacy_setting_id, referencedTableName=privacy', '', NULL, '3.5.4', NULL, NULL, '5336665793');         
CREATE MEMORY TABLE PUBLIC.JHI_USER(
    ID BIGINT DEFAULT (NEXT VALUE FOR PUBLIC.SYSTEM_SEQUENCE_99C30569_781F_4C20_9CE6_F20AA78F4C49) NOT NULL NULL_TO_DEFAULT SEQUENCE PUBLIC.SYSTEM_SEQUENCE_99C30569_781F_4C20_9CE6_F20AA78F4C49,
    LOGIN VARCHAR(50) NOT NULL,
    PASSWORD_HASH VARCHAR(60) NOT NULL,
    FIRST_NAME VARCHAR(50),
    LAST_NAME VARCHAR(50),
    EMAIL VARCHAR(254),
    IMAGE_URL VARCHAR(256),
    ACTIVATED BOOLEAN NOT NULL,
    LANG_KEY VARCHAR(6),
    ACTIVATION_KEY VARCHAR(20),
    RESET_KEY VARCHAR(20),
    CREATED_BY VARCHAR(50) NOT NULL,
    CREATED_DATE TIMESTAMP DEFAULT NULL,
    RESET_DATE TIMESTAMP,
    LAST_MODIFIED_BY VARCHAR(50),
    LAST_MODIFIED_DATE TIMESTAMP
);    
ALTER TABLE PUBLIC.JHI_USER ADD CONSTRAINT PUBLIC.PK_JHI_USER PRIMARY KEY(ID); 
-- 4 +/- SELECT COUNT(*) FROM PUBLIC.JHI_USER; 
INSERT INTO PUBLIC.JHI_USER(ID, LOGIN, PASSWORD_HASH, FIRST_NAME, LAST_NAME, EMAIL, IMAGE_URL, ACTIVATED, LANG_KEY, ACTIVATION_KEY, RESET_KEY, CREATED_BY, CREATED_DATE, RESET_DATE, LAST_MODIFIED_BY, LAST_MODIFIED_DATE) VALUES
(1, 'system', '$2a$10$mE.qmcV0mFU5NcKh73TZx.z4ueI/.bDWbj0T1BYyqP481kGGarKLG', 'System', 'System', 'system@localhost', '', TRUE, 'en', NULL, NULL, 'system', NULL, NULL, 'system', NULL),
(2, 'anonymoususer', '$2a$10$j8S5d7Sr7.8VTOYNviDPOeWX8KcYILUVJBsYV83Y5NtECayypx9lO', 'Anonymous', 'User', 'anonymous@localhost', '', TRUE, 'en', NULL, NULL, 'system', NULL, NULL, 'system', NULL),
(3, 'admin', '$2a$10$gSAhZrxMllrbgj/kkK9UceBPpChGWJA7SYIb1Mqo.n5aNLq1/oRrC', 'Administrator', 'Administrator', 'admin@localhost', '', TRUE, 'en', NULL, NULL, 'system', NULL, NULL, 'system', NULL),
(4, 'user', '$2a$10$VEjxo0jq2YG9Rbk2HmX9S.k1uZBGYUHdUcid3g/vfiEl7lwWgOH/K', 'User', 'User', 'user@localhost', '', TRUE, 'en', NULL, NULL, 'system', NULL, NULL, 'system', NULL);           
CREATE MEMORY TABLE PUBLIC.JHI_AUTHORITY(
    NAME VARCHAR(50) NOT NULL
);     
ALTER TABLE PUBLIC.JHI_AUTHORITY ADD CONSTRAINT PUBLIC.PK_JHI_AUTHORITY PRIMARY KEY(NAME);     
-- 2 +/- SELECT COUNT(*) FROM PUBLIC.JHI_AUTHORITY;            
INSERT INTO PUBLIC.JHI_AUTHORITY(NAME) VALUES
('ROLE_ADMIN'),
('ROLE_USER');   
CREATE MEMORY TABLE PUBLIC.JHI_USER_AUTHORITY(
    USER_ID BIGINT NOT NULL,
    AUTHORITY_NAME VARCHAR(50) NOT NULL
);         
ALTER TABLE PUBLIC.JHI_USER_AUTHORITY ADD CONSTRAINT PUBLIC.CONSTRAINT_E PRIMARY KEY(USER_ID, AUTHORITY_NAME); 
-- 5 +/- SELECT COUNT(*) FROM PUBLIC.JHI_USER_AUTHORITY;       
INSERT INTO PUBLIC.JHI_USER_AUTHORITY(USER_ID, AUTHORITY_NAME) VALUES
(1, 'ROLE_ADMIN'),
(1, 'ROLE_USER'),
(3, 'ROLE_ADMIN'),
(3, 'ROLE_USER'),
(4, 'ROLE_USER');              
CREATE MEMORY TABLE PUBLIC.JHI_PERSISTENT_AUDIT_EVENT(
    EVENT_ID BIGINT DEFAULT (NEXT VALUE FOR PUBLIC.SYSTEM_SEQUENCE_B2398558_7506_4144_82D4_6455E324C759) NOT NULL NULL_TO_DEFAULT SEQUENCE PUBLIC.SYSTEM_SEQUENCE_B2398558_7506_4144_82D4_6455E324C759,
    PRINCIPAL VARCHAR(50) NOT NULL,
    EVENT_DATE TIMESTAMP,
    EVENT_TYPE VARCHAR(255)
);    
ALTER TABLE PUBLIC.JHI_PERSISTENT_AUDIT_EVENT ADD CONSTRAINT PUBLIC.PK_JHI_PERSISTENT_AUDIT_EVENT PRIMARY KEY(EVENT_ID);       
-- 0 +/- SELECT COUNT(*) FROM PUBLIC.JHI_PERSISTENT_AUDIT_EVENT;               
CREATE INDEX PUBLIC.IDX_PERSISTENT_AUDIT_EVENT ON PUBLIC.JHI_PERSISTENT_AUDIT_EVENT(PRINCIPAL, EVENT_DATE);    
CREATE MEMORY TABLE PUBLIC.JHI_PERSISTENT_AUDIT_EVT_DATA(
    EVENT_ID BIGINT NOT NULL,
    NAME VARCHAR(150) NOT NULL,
    VALUE VARCHAR(255)
);              
ALTER TABLE PUBLIC.JHI_PERSISTENT_AUDIT_EVT_DATA ADD CONSTRAINT PUBLIC.CONSTRAINT_F PRIMARY KEY(EVENT_ID, NAME);               
-- 0 +/- SELECT COUNT(*) FROM PUBLIC.JHI_PERSISTENT_AUDIT_EVT_DATA;            
CREATE INDEX PUBLIC.IDX_PERSISTENT_AUDIT_EVT_DATA ON PUBLIC.JHI_PERSISTENT_AUDIT_EVT_DATA(EVENT_ID);           
CREATE MEMORY TABLE PUBLIC.USER_PROFILE(
    ID BIGINT DEFAULT (NEXT VALUE FOR PUBLIC.SYSTEM_SEQUENCE_A973D896_49E9_4108_9EB2_04CCBD2E46C1) NOT NULL NULL_TO_DEFAULT SEQUENCE PUBLIC.SYSTEM_SEQUENCE_A973D896_49E9_4108_9EB2_04CCBD2E46C1,
    FIRST_NAME VARCHAR(255),
    LAST_NAME VARCHAR(255),
    USER_STACK VARCHAR(255),
    USER_ID BIGINT,
    EMPLOYER_ID BIGINT,
    COHORT_ID BIGINT
);           
ALTER TABLE PUBLIC.USER_PROFILE ADD CONSTRAINT PUBLIC.PK_USER_PROFILE PRIMARY KEY(ID);         
-- 0 +/- SELECT COUNT(*) FROM PUBLIC.USER_PROFILE;             
CREATE MEMORY TABLE PUBLIC.COHORT(
    ID BIGINT DEFAULT (NEXT VALUE FOR PUBLIC.SYSTEM_SEQUENCE_B49B1531_1AC3_4339_BF47_BF8C89C85F3B) NOT NULL NULL_TO_DEFAULT SEQUENCE PUBLIC.SYSTEM_SEQUENCE_B49B1531_1AC3_4339_BF47_BF8C89C85F3B,
    GRAD_DATE VARCHAR(255)
);             
ALTER TABLE PUBLIC.COHORT ADD CONSTRAINT PUBLIC.PK_COHORT PRIMARY KEY(ID);     
-- 0 +/- SELECT COUNT(*) FROM PUBLIC.COHORT;   
CREATE MEMORY TABLE PUBLIC.EMPLOYER(
    ID BIGINT DEFAULT (NEXT VALUE FOR PUBLIC.SYSTEM_SEQUENCE_FECABC6A_D198_488F_B104_F7AA0724091D) NOT NULL NULL_TO_DEFAULT SEQUENCE PUBLIC.SYSTEM_SEQUENCE_FECABC6A_D198_488F_B104_F7AA0724091D,
    COMPANY_NAME VARCHAR(255),
    CITY VARCHAR(255),
    STATE VARCHAR(255)
);         
ALTER TABLE PUBLIC.EMPLOYER ADD CONSTRAINT PUBLIC.PK_EMPLOYER PRIMARY KEY(ID); 
-- 0 +/- SELECT COUNT(*) FROM PUBLIC.EMPLOYER; 
CREATE MEMORY TABLE PUBLIC.POST(
    ID BIGINT DEFAULT (NEXT VALUE FOR PUBLIC.SYSTEM_SEQUENCE_69E8117E_547D_4FA0_B4B8_7D61F900115C) NOT NULL NULL_TO_DEFAULT SEQUENCE PUBLIC.SYSTEM_SEQUENCE_69E8117E_547D_4FA0_B4B8_7D61F900115C,
    JHI_TIMESTAMP DATE,
    CONTENT VARCHAR(255),
    LIKES VARCHAR(255),
    POSTER_ID BIGINT,
    PRIVACY_SETTING_ID BIGINT
);            
ALTER TABLE PUBLIC.POST ADD CONSTRAINT PUBLIC.PK_POST PRIMARY KEY(ID);         
-- 0 +/- SELECT COUNT(*) FROM PUBLIC.POST;     
CREATE MEMORY TABLE PUBLIC.PRIVACY(
    ID BIGINT DEFAULT (NEXT VALUE FOR PUBLIC.SYSTEM_SEQUENCE_05BAF210_F502_4348_B72D_30B4760D1D03) NOT NULL NULL_TO_DEFAULT SEQUENCE PUBLIC.SYSTEM_SEQUENCE_05BAF210_F502_4348_B72D_30B4760D1D03,
    PUBLIC_VIEW BOOLEAN,
    COHORT_VIEW BOOLEAN,
    EMPLOYER_VIEW BOOLEAN
);           
ALTER TABLE PUBLIC.PRIVACY ADD CONSTRAINT PUBLIC.PK_PRIVACY PRIMARY KEY(ID);   
-- 0 +/- SELECT COUNT(*) FROM PUBLIC.PRIVACY;  
ALTER TABLE PUBLIC.JHI_USER ADD CONSTRAINT PUBLIC.UX_USER_LOGIN UNIQUE(LOGIN); 
ALTER TABLE PUBLIC.USER_PROFILE ADD CONSTRAINT PUBLIC.UX_USER_PROFILE_USER_ID UNIQUE(USER_ID); 
ALTER TABLE PUBLIC.JHI_USER ADD CONSTRAINT PUBLIC.UX_USER_EMAIL UNIQUE(EMAIL); 
ALTER TABLE PUBLIC.POST ADD CONSTRAINT PUBLIC.FK_POST_POSTER_ID FOREIGN KEY(POSTER_ID) REFERENCES PUBLIC.USER_PROFILE(ID) NOCHECK;             
ALTER TABLE PUBLIC.POST ADD CONSTRAINT PUBLIC.FK_POST_PRIVACY_SETTING_ID FOREIGN KEY(PRIVACY_SETTING_ID) REFERENCES PUBLIC.PRIVACY(ID) NOCHECK;
ALTER TABLE PUBLIC.JHI_USER_AUTHORITY ADD CONSTRAINT PUBLIC.FK_USER_ID FOREIGN KEY(USER_ID) REFERENCES PUBLIC.JHI_USER(ID) NOCHECK;            
ALTER TABLE PUBLIC.JHI_PERSISTENT_AUDIT_EVT_DATA ADD CONSTRAINT PUBLIC.FK_EVT_PERS_AUDIT_EVT_DATA FOREIGN KEY(EVENT_ID) REFERENCES PUBLIC.JHI_PERSISTENT_AUDIT_EVENT(EVENT_ID) NOCHECK;        
ALTER TABLE PUBLIC.USER_PROFILE ADD CONSTRAINT PUBLIC.FK_USER_PROFILE_EMPLOYER_ID FOREIGN KEY(EMPLOYER_ID) REFERENCES PUBLIC.EMPLOYER(ID) NOCHECK;             
ALTER TABLE PUBLIC.USER_PROFILE ADD CONSTRAINT PUBLIC.FK_USER_PROFILE_COHORT_ID FOREIGN KEY(COHORT_ID) REFERENCES PUBLIC.COHORT(ID) NOCHECK;   
ALTER TABLE PUBLIC.USER_PROFILE ADD CONSTRAINT PUBLIC.FK_USER_PROFILE_USER_ID FOREIGN KEY(USER_ID) REFERENCES PUBLIC.JHI_USER(ID) NOCHECK;     
ALTER TABLE PUBLIC.JHI_USER_AUTHORITY ADD CONSTRAINT PUBLIC.FK_AUTHORITY_NAME FOREIGN KEY(AUTHORITY_NAME) REFERENCES PUBLIC.JHI_AUTHORITY(NAME) NOCHECK;

insert into PUBLIC.EMPLOYER (COMPANY_NAME, CITY, STATE) values ('Kwideo', 'Saint Louis', 'Missouri');
insert into PUBLIC.EMPLOYER (COMPANY_NAME, CITY, STATE) values ('Mybuzz', 'Silver Spring', 'Maryland');
insert into PUBLIC.EMPLOYER (COMPANY_NAME, CITY, STATE) values ('Gabcube', 'Houston', 'Texas');
insert into PUBLIC.EMPLOYER (COMPANY_NAME, CITY, STATE) values ('Topicblab', 'El Paso', 'Texas');
insert into PUBLIC.EMPLOYER (COMPANY_NAME, CITY, STATE) values ('JumpXS', 'Shreveport', 'Louisiana');
insert into PUBLIC.EMPLOYER (COMPANY_NAME, CITY, STATE) values ('Aivee', 'Winston Salem', 'North Carolina');
insert into PUBLIC.EMPLOYER (COMPANY_NAME, CITY, STATE) values ('Gigaclub', 'Las Vegas', 'Nevada');
insert into PUBLIC.EMPLOYER (COMPANY_NAME, CITY, STATE) values ('Browseblab', 'Nashville', 'Tennessee');
insert into PUBLIC.EMPLOYER (COMPANY_NAME, CITY, STATE) values ('Yakidoo', 'Suffolk', 'Virginia');
insert into PUBLIC.EMPLOYER (COMPANY_NAME, CITY, STATE) values ('Feedfish', 'Jacksonville', 'Florida');
insert into PUBLIC.EMPLOYER (COMPANY_NAME, CITY, STATE) values ('Skyble', 'Columbia', 'Missouri');
insert into PUBLIC.EMPLOYER (COMPANY_NAME, CITY, STATE) values ('Aibox', 'Winston Salem', 'North Carolina');
insert into PUBLIC.EMPLOYER (COMPANY_NAME, CITY, STATE) values ('Roodel', 'Des Moines', 'Iowa');
insert into PUBLIC.EMPLOYER (COMPANY_NAME, CITY, STATE) values ('Fivebridge', 'Miami', 'Florida');
insert into PUBLIC.EMPLOYER (COMPANY_NAME, CITY, STATE) values ('Ntags', 'Columbus', 'Ohio');
insert into PUBLIC.EMPLOYER (COMPANY_NAME, CITY, STATE) values ('Mymm', 'Shawnee Mission', 'Kansas');
insert into PUBLIC.EMPLOYER (COMPANY_NAME, CITY, STATE) values ('Dablist', 'Reno', 'Nevada');
insert into PUBLIC.EMPLOYER (COMPANY_NAME, CITY, STATE) values ('Zoomcast', 'San Diego', 'California');
insert into PUBLIC.EMPLOYER (COMPANY_NAME, CITY, STATE) values ('Roomm', 'Lexington', 'Kentucky');
insert into PUBLIC.EMPLOYER (COMPANY_NAME, CITY, STATE) values ('Dablist', 'Washington', 'District of Columbia');

insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Woodman', 'Vereker', 'TypeScript', 24, 17, 4);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Toby', 'Leyband', 'Ruby', 7, 14, 2);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Aubrette', 'Oak', 'Ruby', 18, 7, 5);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Tilda', 'Dunnan', 'Python', 11, 17, 3);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Selby', 'Gregoletti', 'JavaScript', 20, 13, 6);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Celina', 'Leist', 'Ruby', 5, 15, 4);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Hanni', 'Marrington', 'Java', 24, 4, 5);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Giovanna', 'Probart', 'Python', 5, 20, 7);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Evania', 'Cranston', 'Java', 21, 3, 10);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Bailey', 'Antushev', 'JavaScript', 10, 17, 10);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Sydney', 'Moff', 'Ruby', 23, 3, 8);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Romona', 'Poulston', 'Java', 26, 3, 6);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Katharine', 'Boustred', null, 9, 17, 5);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Butch', 'Leslie', 'Python', 26, 5, 1);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Janine', 'Ruske', 'Python', 30, 7, 1);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Walden', 'Embra', 'Java', 2, 7, 1);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Sigismondo', 'Longthorne', 'Java', 12, 3, 6);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Siward', 'Hawford', 'TypeScript', 23, 20, 2);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Fredrick', 'Walwood', 'TypeScript', 14, 2, 1);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Elyn', 'McIleen', null, 25, 3, 3);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Rubi', 'Filipovic', 'Python', 28, 18, 6);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Donelle', 'Bielfeldt', 'Ruby', 10, 19, 1);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Perkin', 'Dinesen', 'Ruby', 21, 6, 5);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Edy', 'Balma', 'Java', 23, 18, 4);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Janos', 'Baggiani', 'Ruby', 8, 18, 4);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Kariotta', 'Spurnier', 'Ruby', 8, 11, 5);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Kristo', 'Wehner', 'Python', 4, 18, 8);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Dell', 'Izzat', 'Python', 4, 19, 5);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Isabeau', 'Colam', 'Ruby', 6, 6, 6);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Aurlie', 'Dukelow', 'Python', 29, 14, 4);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Austin', 'Callf', 'JavaScript', 13, 18, 7);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Stanfield', 'Coursor', 'JavaScript', 16, 12, 1);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Osbourne', 'De Coursey', 'Ruby', 3, 7, 1);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Baldwin', 'Coviello', 'Ruby', 19, 20, 5);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Nickolas', 'McAlpine', 'Ruby', 16, 6, 8);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Viki', 'Corkel', 'JavaScript', 22, 17, 9);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Shani', 'Tschersich', 'JavaScript', 30, 14, 7);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Garold', 'Casetti', 'Java', 13, 15, 9);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Atlanta', 'Blamire', 'Ruby', 23, 12, 1);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Jay', 'Kirckman', 'Python', 20, 9, 5);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Ardelis', 'Grancher', 'TypeScript', 5, 5, 2);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Wadsworth', 'Nottle', 'JavaScript', 1, 13, 8);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Findley', 'Rennolds', 'Java', 10, 15, 10);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Rudolf', 'Bodemeaid', 'Ruby', 6, 16, 1);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Minor', 'Howlings', 'Java', 25, 8, 5);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Imelda', 'MacCambridge', 'Python', 16, 19, 3);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Klaus', 'Clegg', 'Python', 1, 15, 5);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Meaghan', 'Kalkofen', null, 1, 5, 3);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Sara', 'Lensch', 'TypeScript', 28, 16, 2);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Wyatt', 'Ellar', 'Python', 25, 1, 6);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Ardelis', 'Danzey', 'Java', 15, 12, 9);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Ciro', 'Daubeny', 'Python', 12, 6, 8);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Lorilee', 'Radbourne', 'Ruby', 6, 10, 2);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Tracey', 'Mathiassen', 'TypeScript', 22, 16, 1);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Alene', 'Kingscott', 'Python', 27, 20, 4);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Irv', 'Farnan', null, 20, 11, 4);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('William', 'Winkworth', 'TypeScript', 1, 10, 2);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Tilda', 'Brende', 'TypeScript', 15, 20, 9);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Augie', 'Gogin', 'Java', 22, 10, 1);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Roselle', 'Frigot', 'TypeScript', 17, 2, 5);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Lion', 'Yeatman', 'TypeScript', 10, 17, 3);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Tasia', 'Garmanson', 'Java', 22, 7, 5);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Wilburt', 'Yarn', 'JavaScript', 6, 9, 3);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Ansell', 'Munday', 'TypeScript', 10, 11, 7);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Joseph', 'Harvey', 'TypeScript', 11, 7, 2);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Idell', 'Blemen', 'Ruby', 6, 14, 9);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Alikee', 'Kellart', 'TypeScript', 24, 9, 5);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Melina', 'Jewess', 'JavaScript', 28, 20, 4);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Killian', 'Mitchel', 'Ruby', 28, 19, 3);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Carroll', 'Izzatt', 'Python', 26, 20, 9);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Austina', 'Haine', 'JavaScript', 14, 17, 2);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Armando', 'Hussell', 'Python', 14, 2, 4);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Terrel', 'Mordon', 'TypeScript', 7, 18, 7);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Shep', 'Warboy', 'TypeScript', 7, 18, 5);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Herbert', 'Noirel', 'TypeScript', 27, 8, 9);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Mellisent', 'Wegman', 'TypeScript', 22, 6, 6);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Clemmy', 'Hamp', null, 17, 18, 10);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Doll', 'Harman', 'Java', 13, 13, 10);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Carny', 'Satchel', 'Python', 24, 9, 3);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Ellis', 'MacKeogh', null, 4, 1, 2);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Cristiano', 'Hairsnape', 'TypeScript', 16, 1, 9);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Michaeline', 'Karpov', 'Ruby', 19, 18, 3);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Miranda', 'Golsby', 'Java', 3, 11, 8);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Harriot', 'Cundy', 'Ruby', 6, 9, 6);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Auberon', 'Beadnall', null, 25, 11, 2);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Maximilianus', 'Vigietti', 'JavaScript', 28, 9, 2);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Tersina', 'Gerlack', 'Python', 22, 16, 10);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Lissa', 'Garford', 'TypeScript', 11, 1, 6);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Erwin', 'Mosco', 'Java', 2, 18, 9);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Krisha', 'Dormer', 'TypeScript', 27, 15, 4);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Galven', 'Gieves', 'TypeScript', 13, 19, 4);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Donny', 'Litton', 'Ruby', 20, 9, 6);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Drusi', 'Penticoot', null, 23, 10, 4);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Sheelagh', 'Bromwich', null, 2, 1, 10);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Lita', 'Endle', 'Ruby', 10, 7, 9);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Rosalia', 'Lackner', null, 8, 7, 10);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Kizzee', 'Dummigan', 'Ruby', 11, 1, 9);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Richy', 'Faulconbridge', 'Python', 28, 17, 8);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Claudian', 'Lynock', 'Python', 10, 4, 3);
insert into PUBLIC.USER_PROFILE (first_name, last_name, user_stack, user_id, employer_id, cohort_id) values ('Karney', 'Bantham', 'JavaScript', 29, 7, 9);

insert into PUBLIC.COHORT (id, grad_date) values (1, '3/19/2016');
insert into PUBLIC.COHORT (id, grad_date) values (2, '8/18/2018');
insert into PUBLIC.COHORT (id, grad_date) values (3, '11/23/2015');
insert into PUBLIC.COHORT (id, grad_date) values (4, '4/23/2016');
insert into PUBLIC.COHORT (id, grad_date) values (5, '8/10/2017');
insert into PUBLIC.COHORT (id, grad_date) values (6, '12/7/2018');
insert into PUBLIC.COHORT (id, grad_date) values (7, '10/18/2016');
insert into PUBLIC.COHORT (id, grad_date) values (8, '1/14/2015');
insert into PUBLIC.COHORT (id, grad_date) values (9, '3/20/2016');
insert into PUBLIC.COHORT (id, grad_date) values (10, '2/20/2015');
