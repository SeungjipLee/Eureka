use eureka_db;

#1. card_company
drop table if exists card_company;
create table if not exists card_company
(
    card_company_id int             auto_increment      primary key     COMMENT '카드사 PK',
    company_name    varchar(30)     not null                            COMMENT '카드사 이름',
    org_code        char(10)        not null            unique          COMMENT '기관 번호',
    card_brand      varchar(3)      not null                            COMMENT '카드사 브랜드 번호',
    image_path      varchar(255)    not null                            COMMENT '카드사 이미지 경로'
);

#2. large_category
drop table if exists large_category;
create table large_category
(
    large_category_id   tinyint         auto_increment      primary key     COMMENT '대분류 카테고리 관리번호',
    category_name       varchar(100)    not null            unique          COMMENT '대분류 카테고리 이름'
);

#3. small_category
drop table if exists small_category;
create table if not exists small_category
(
    small_category_id   int             auto_increment    primary key       COMMENT '소분류 카테고리 관리번호',
    category_name       varchar(300)    not null                            COMMENT '소분류 카테고리 이름',
    large_category_id   tinyint         not null                            COMMENT '대분류 카테고리 관리번호'
);

#4. card
drop table if exists card;
create table if not exists card(
    card_id              int            auto_increment     primary key     COMMENT '카드 관리번호',
    card_company_id      int            not null                           COMMENT '카드사 관리번호',
    card_type            int            not null                           COMMENT '카드 타입(0:신용, 1:체크, 2:소액신용체크)',
    card_name            varchar(300)   not null                           COMMENT '카드 이름',
    annual_fee           int            not null                           COMMENT '연회비',
    previous_performance int            not null                           COMMENT '전월실적',
    caution              text           null                               COMMENT '유의사항',
    image_path           varchar(255)   not null                           COMMENT '카드 이미지 경로',
    img_attr             int            not null                           COMMENT '카드 이미지 방향',
    view                 int            not null            default 0      COMMENT '카드 조회수',
    join_path            text           null                               COMMENT '카드 가입 경로',
    is_expired           boolean        not null            default 0      COMMENT '카드 만료 여부(가입)'
);

create index idx_card_company on card(card_company_id);

#5. card_benefit
drop table if exists card_benefit;
create table if not exists card_benefit
(
    card_benefit_id int             auto_increment      primary key     COMMENT '카드 혜택 관리번호',
    card_id         int             not null                            COMMENT '카드 관리번호',
    title           varchar(300)    null                                COMMENT '혜택 분류(제목)',
    info            text            null                                COMMENT '상품 설명',
    info_detail     text            null                                COMMENT '상품 상세설명'
);

create index idx_card_id on card_benefit(card_id);


#6. card_benefit_detail
drop table if exists card_benefit_detail;
create table if not exists card_benefit_detail
(
    card_benefit_detail_id int          auto_increment   primary key    COMMENT '할인 상세혜택 관리번호',
    card_benefit_id        int          not null                        COMMENT '할인 혜택 관리번호',
    large_category_id      tinyint      not null                        COMMENT '대분류 카테고리',
    small_category_id      int          null                            COMMENT '소분류 카테고리 관리번호',
    discount_type          int          not null                        COMMENT '할인 타입(0:즉시, 1:청구, 2:포인트)',
    discount_cost          double       not null                        COMMENT '할인 가격',
    discount_cost_type     varchar(10)  null                            COMMENT '할인 가격 타입(원, %, L)',
    pay_min                int          not null                        COMMENT '최소 결제 금액',
    discount_max           int          not null                        COMMENT '할인 최대 금액',
    discount_limit         int          not null                        COMMENT '할인 한도',
    daily_limit_count      int          not null                        COMMENT '일일 할인 제한(횟수)',
    monthly_limit_count    int          not null                        COMMENT '월별 할인 제한(횟수)'
);

create index idx_card_benefit_id on card_benefit_detail(card_benefit_id);
create index idx_card_benefit_id_large_category_id_small_category_id on card_benefit_detail(card_benefit_id, large_category_id, small_category_id);


#7. user
drop table if exists user;
create table if not exists user
(
    user_id          int            auto_increment      primary key                 COMMENT '유저 관리번호',
    user_birth       char(6)        not null                                        COMMENT '생년월일(6자리)',
    user_gender      char(1)        not null                                        COMMENT '주민번호 뒤자리 1번쨰',
    user_name        varchar(30)    not null                                        COMMENT '이름',
    phone_number     varchar(255)   not null            unique                      COMMENT '휴대폰 번호(AES-256)',
    password         varchar(255)   not null                                        COMMENT '비밀번호(6자리, BCrypt)',
    registered_at    datetime       not null            DEFAULT current_timestamp   COMMENT '가입 일시',
    is_unregistered  boolean        not null            DEFAULT 0                   COMMENT '탈퇴 여부',
    un_registered_at datetime       null                                            COMMENT '탈외 일시'
);


#8. user_card
drop table if exists user_card;
create table if not exists user_card
(
    user_card_id            int             auto_increment     primary key      COMMENT '유저 카드 관리번호',
    user_id                 int             not null                            COMMENT '유저 관리번호',
    card_id                 int             not null                            COMMENT '카드 관리번호',
    card_identifier         char(100)       not null           unique           COMMENT '카드 식별자 값',
    first_card_number       char(4)         null                                COMMENT '카드 앞 4자리',
    last_card_number        char(4)         null                                COMMENT '카드 뒤 4자리',
    current_month_amount    bigint          null                                COMMENT '당월 사용 금액',
    is_payment_enabled      bit             not null           default 0        COMMENT '결제 카드 등록 여부',
    payment_date            datetime        null                                COMMENT '결제일',
    expired_year            char(2)         null                                COMMENT '카드 유효기간 도(2자리)',
    expired_month           char(2)         null                                COMMENT '카드 유효기간 월(2자리)',
    token                   varchar(255)    null
);

create index idx_user_id on user_card(user_id);


#9. partnership_store
# drop table if exists partnership_store;
# create table if not exists partnership_store
# (
#     partnership_store_id    int             auto_increment      primary key     COMMENT '제휴 가맹점 관리번호',
#     small_category_id       int             not null                            COMMENT '소분류 카테고리 관리번호',
#     store_code              char(20)        not null            unique          COMMENT '가맹점 코드',
#     store_name              varchar(300)    not null            unique          COMMENT '가맹점명',
#     store_reg_no            char(12)        not null                            COMMENT '사업자 등록번호 "-"포함'
# );


#10. pay_history
drop table if exists pay_history;
create table if not exists pay_history
(
    pay_history_id          int             auto_increment      primary key                 COMMENT '카드 결제 내역 관리번호',
    order_id                char(64)        not null                                        COMMENT '주문 번호',
    user_id                 int             not null                                        COMMENT '유저 관리번호',
    user_card_id            int             not null                                        COMMENT '유저 카드 관리번호',
    recommendCardId         int             not null                                        COMMENT '추천 카드 관리번호',
#     partnership_store_id    int             not null                                        COMMENT '제휴 가맹점 관리번호',
    large_category_id       tinyint         not null                                        COMMENT '대분류 카테고리 번호',
    small_category_id       int             null                                            COMMENT '소분류 카테고리 번호',
    approved_num            char(8)         not null                                        COMMENT '승인 번호',
    approved_date_time      datetime        not null            default current_timestamp   COMMENT '승인 일시',
    approved_amt            int             not null                                        COMMENT '승인 금액',
    status                  int             not null                                        COMMENT '결제 상태(0:승인, 1:승인취소, 2:정정, 3:무승인매입)',
    trans_date_time         datetime        not null                                        COMMENT '정정 또는 취소 일시',
    modified_amt            int             null                                            COMMENT '정정 후 금액',
    total_install_cnt       tinyint         not null                                        COMMENT '할부 개월 수',
    discount                int             not null            default 0                   COMMENT '할인 금액',
    recommendDiscount       int             not null            default 0                   COMMENT '추천 카드 할인 금액'
);

create index idx_user_id on pay_history(user_id);
create index idx_user_card_id on pay_history(user_card_id);


#11. consumption_static
drop table if exists consumption_static;
create table if not exists consumption_static
(
    consumption_static_id   int         auto_increment      primary key     COMMENT '소비 통계 관리번호',
    user_card_id            int         not null                            COMMENT '유저 카드 관리번호',
    year                    char(4)     not null                            COMMENT '년도 (4자리)',
    month                   char(2)     not null                            COMMENT '월 (2자리)',
    total_consumption       bigint      not null            default 0       COMMENT '총 소비 금액'
);

create index idx_user_card_id_year_month on consumption_static(user_card_id, year, month);


#12. consumption_large_static
drop table if exists consumption_large_static;
create table if not exists consumption_large_static
(
    consumption_large_static_id     int         auto_increment      primary key     COMMENT '소비 상세 관리 번호(대분류 카테고리별)',
    consumption_static_id           int         not null                            COMMENT '소비 통계 관리 번호',
    large_category_id               tinyint     not null                            COMMENT '대분류 카테고리 관리번호',
    consumption_amount              bigint      not null                            COMMENT '총 소비 금액',
    consumption_count               int         not null                            COMMENT '총 소비 횟수'
);

create index idx_consumption_static_id_large_category_id on consumption_large_static(consumption_static_id, large_category_id);


#13. consumption_small_static
drop table if exists consumption_small_static;
create table if not exists consumption_small_static
(
    consumption_small_static_id     int         auto_increment      primary key     COMMENT '소비 금액 내역 관리번호(소분류 카테고리별)',
    consumption_large_static_id     int         not null                            COMMENT '소비 상세 관리 번호',
    small_category_id               int         not null                            COMMENT '소분류 카테고리 관리번호',
    consumption                     bigint      not null                            COMMENT '소비 금액',
    consumption_count               int         not null                            COMMENT '소비 횟수'
);

create index idx_consumption_large_static_id_small_category_id on consumption_small_static(consumption_large_static_id, small_category_id);


#14. discount_static
drop table if exists discount_static;
create table if not exists discount_static
(
    discount_static_id      int         auto_increment      primary key     COMMENT '할인 통계 관리번호',
    user_card_id            int         not null                            COMMENT '유저 카드 관리번호',
    year                    char(4)     not null                            COMMENT '년도 (4자리)',
    month                   char(2)     not null                            COMMENT '월 (2자리)',
    total_discount          int         not null            default 0       COMMENT '총 할인 금액'
);

create index idx_user_card_id_year_month on discount_static(user_card_id, year, month);


#15. discount_large_static
drop table if exists discount_large_static;
create table if not exists discount_large_static
(
    discount_large_static_id     int         auto_increment      primary key     COMMENT '할인 상세 관리 번호(대분류 카테고리별)',
    discount_static_id           int         not null                            COMMENT '할인 통계 관리 번호',
    large_category_id            tinyint     not null                            COMMENT '대분류 카테고리 관리번호',
    discount_amount              int         not null                            COMMENT '총 할인 금액',
    discount_count               int         not null                            COMMENT '총 할인 횟수'
);

create index idx_discount_static_id_large_category_id on discount_large_static(discount_static_id, large_category_id);


#16. discount_small_static
drop table if exists discount_small_static;
create table if not exists discount_small_static
(
    discount_small_static_id    int         auto_increment      primary key     COMMENT '할인 금액 내역 관리번호(소분류 카테고리별)',
    discount_large_static_id    int         not null                            COMMENT '할인 상세 관리 번호',
    small_category_id           int         not null                            COMMENT '소분류 카테고리 관리번호',
    discount                    int         not null                            COMMENT '할인 금액',
    discount_count              int         not null                            COMMENT '할인 횟수'
);

create index idx_discount_large_static_id_small_category_id on discount_small_static(discount_large_static_id, small_category_id);

#17. card_ownership_overview
drop table if exists card_ownership_overview;
create table if not exists card_ownership_overview
(
    overview_id         int             auto_increment      primary key     comment '카드 보유현황 관리번호',
    card_id             int             not null                            comment '카드상품 정보 번호',
    ownership_count     int             not null                            comment '카드 보유 수',
    created_date        date            not null                            comment '생성일'
);

#18. card_ownership_static
drop table if exists card_ownership_static;
create table if not exists card_ownership_static
(
    ownership_static_id         int             auto_increment      primary key     comment '카드 보유자 통계 관리번호',
    card_id                     int             not null                            comment '카드상품 정보 번호',
    age_group                   char(1)         not null                            comment '연령대',
    gender                      char(1)         not null                            comment '성별',
    ownership_count             int             not null                            comment '카드 보유 수',
    created_date                date            not null                            comment '생성일'
);

#19. consumption_user_static
drop table if exists consumption_user_static;
create table if not exists consumption_user_static
(
    consumption_user_static_id  int         auto_increment      primary key     comment '소비 사용자 통계 관리번호',
    large_category_id           int         not null                            comment '대분류 카테고리 관리번호',
    age_group                   char(1)     not null                            comment '연령대',
    gender                      char(1)     not null                            comment '성별',
    year                        char(4)     not null                            COMMENT '년도 (4자리)',
    month                       char(2)     not null                            COMMENT '월 (2자리)',
    consumption_amount          bigint      not null                            comment '총 소비 금액',
    created_date                date        not null                            comment '생성일'
);

#20. tag
drop table if exists tag;
create table if not exists tag(
    tag_id              int             auto_increment      primary key     comment '태그 관리번호',
    large_category_id   int             not null                            comment '대분류 카테고리',
    tag_name            varchar(100)    not null                            comment '태그 명',
    tag_image_path      varchar(300)    not null                            comment '태그 이미지 경로'
);

#21. user_tag
drop table if exists user_tag;
create table if not exists user_tag(
    user_tag_id     int     auto_increment      primary key     comment '유저 태그 관리번호',
    user_id         int     not null                            comment '유저 관리번호',
    tag_id          int     not null                            comment '태그 관리번호'
);

create index idx_user_id on user_tag(user_id);
