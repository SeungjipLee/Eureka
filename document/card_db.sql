use card_db;

#1. card_company table
drop table if exists card_company;
create table if not exists card_company
(
    card_company_id int             auto_increment      primary key     COMMENT '카드사 PK',
    company_name    varchar(30)     not null                            COMMENT '카드사 이름',
    org_code        char(10)        not null            unique          COMMENT '기관 번호',
    card_brand      varchar(3)      not null                            COMMENT '카드사 브랜드 번호',
    image_path      varchar(255)    not null                            COMMENT '카드사 이미지 경로'
);


# 2. card
drop table if exists card;
create table if not exists card
(
    card_id              int         auto_increment     primary key     COMMENT '카드 관리번호',
    card_company_id      int         not null                           COMMENT '카드사 관리번호',
    card_type            int         not null                           COMMENT '카드 타입(0:신용, 1:체크, 2:소액신용체크)',
    card_name            varchar(300) not null                           COMMENT '카드 이름',
    annual_fee           int         not null                           COMMENT '연회비',
    previous_performance int         not null                           COMMENT '전월실적',
    caution              text        null                               COMMENT '유의사항',
    image_path           text        not null                           COMMENT '카드 이미지 경로',
    img_attr             int         not null                           COMMENT '카드 이미지 방향',
    join_path            text        null                               COMMENT '카드 가입 경로',
    is_expired           boolean     not null           default  0      COMMENT '카드 만료 여부(가입)'
);

create index idx_card_company ON card(card_company_id);


# 3. user
drop table if exists user;
create table if not exists user
(
    user_id      int            auto_increment      primary key     COMMENT '유저 관리번호',
    birth        char(6)        not null                            COMMENT '생년월일(6자리)',
    name         varchar(30)    not null                            COMMENT '이름',
    phone_number char(11)       not null            unique          COMMENT '휴대폰 번호("-"없이 11자리)'
);


#4. user_card
drop table if exists user_card;
create table if not exists user_card
(
    user_card_id    int             auto_increment  primary key     COMMENT '유저 카드 관리번호',
    user_id         int             not null                        COMMENT '유저 관리번호',
    card_id         int             not null                        COMMENT '카드 관리번호',
    card_identifier char(64)        not null        unique          COMMENT '카드 식별자 값',
    card_number     char(16)        not null        unique          COMMENT '카드 번호("-"없이 16자리)',
    card_cvc        char(3)         not null                        COMMENT '카드 cvc(3자리)',
    card_password   char(4)         not null                        COMMENT '카드 비밀번호(4자리)',
    card_member     int             not null                        COMMENT '본인/가족 (0:본인, 1:가족)',
    expired_year    char(2)         not null                        COMMENT '카드 유효기간 년(2자리)',
    expired_month   char(2)         not null                        COMMENT '카드 요휴기간 월(2자리)',
    token           text            null                            COMMENT '결제 인증 토큰 값'
);

create index idx_user_id ON user_card(user_id);


#5. card_history
drop table if exists card_history;
create table if not exists card_history
(
    card_history_id         int           auto_increment    primary key   COMMENT '카드 결제 내역 관리번호',
    user_card_id            int           not null                        COMMENT '유저 카드 관리번호',
    status                  int           not null                        COMMENT '결제 상태(0:승인, 1:승인취소, 2:정정, 3:무승인매입)',
    pay_type                int           not null                        COMMENT '사용구분 (0:신용, 1:체크)',
    approved_num            char(8)       not null          unique        COMMENT '승인 번호',
    approved_date_time      datetime      not null                        COMMENT '승인 일시',
    approved_amt            int           not null                        COMMENT '승인 금액',
    trans_date_time         datetime      null                            COMMENT '정정 또는 취소 일시',
    modified_amt            int           null                            COMMENT '정정 후 금액',
    merchant_name           varchar(75)   not null                        COMMENT '사업자 명',
    merchant_reg_no         char(12)      not null                        COMMENT '사업자 등록번호 "-"포함',
    total_install_cnt       tinyint       null                            COMMENT '할부 개월 수',
    large_category_id       int           not null                        COMMENT '대분류 카테고리 번호',
    small_category_id       int           not null                        COMMENT '소분류 카테고리 번호'
);

create index idx_user_card_id ON card_history(user_card_id);
create index idx_approved_num ON card_history(approved_num);
CREATE INDEX idx_user_card_id_approved_date_time ON card_history(user_card_id, approved_date_time);


