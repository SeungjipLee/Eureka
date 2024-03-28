#5-2. card_history dummy


drop table if exists card_history;
create table if not exists card_history
(
    card_history_id         int           auto_increment    primary key   COMMENT '카드 결제 내역 관리번호',
    user_card_id            int           not null                        COMMENT '유저 카드 관리번호',
    status                  int           not null                        COMMENT '결제 상태(0:승인, 1:승인취소, 2:정정, 3:무승인매입)',
    pay_type                int           not null                        COMMENT '사용구분 (0:신용, 1:체크)',
    approved_num            char(8)       not null                        COMMENT '승인 번호',
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


# insert into card_history(user_card_id, status, pay_type, approved_num, approved_date_time, approved_amt, trans_date_time, modified_amt, merchant_name, merchant_regno, total_install_cnt, large_category_id, small_category_id)
# values ();

user_card_id는 25 ~ 30번 골고루 해줘
status, pay_type은 모두 0으로 해줘
approved_num은 8자리 숫자로 랜덤하게 해줘
approved_amt는 결제 금액인데 적당한 금액으로 해줘
approved_date_time는 그럴듯하게 너가 만들어줘
trans_date_time은 모두 null로 해줘
modified_amt는 모두 null로 해줘
merchant_name은 아래의 목록에서 하나 골라줘
merchant_reg_no는 아래에 작성해놓을게
total_install_cnt는 모두 null로 해줘
large_category_id, small_category_id는 merchant_name에 같이 써놓을게.

2023년 12월 1일부터 2024년 3월 27일까지 하루의 3 ~ 10건 이내로 해서 만들어줘 총 800건 정도로

merchant 목록
merchant_name, large_category_id, small_category_id, merchant_reg_no

'스타벅스 하단점', 12, 1, '000-00-00001'
'스타벅스 명지점', 12, 1, '000-00-00002'
'커피빈 명지점', 12, 2, '000-00-00003'
'CU편의점 명지점', 5. 9, '000-00-00004'
'GS25 명지점', 5, 8, '000-00-00005'
'이마트24 명지점', 5, 149, '000-00-00006'
'배달의 민족', 9, 12, '000-00-00007'
'요기요', 9, 13, '000-00-00008'
'에버랜드', 22, 19, '000-00-00009'
'여기어때', 25, 280, '000-00-000010'
'S-OIL 명지점', 3, 157, '000-00-00011'
'KTX', 2, 184, '000-00-00012'
'지하철', 2, 36, '000-00-00013'
'택시', 2, 39, '000-00-000014'
'시내버스', 2, 35, '000-00-00015'
'롯데리아 명지점', 10, 95, '000-00-00018'
'KFC 명지점', 10, 96, '000-00-00019'
'박승철 헤어스투디오 명지점', 14, 40, '000-00-00023'
'올리브영 명지점', 14, 6, '000-00-00024'
'NC백화점 명지점', 8, 374, '000-00-00025'
'쿠팡', 7, 132, '000-00-00026'
'파리바게트 명지점', 13, 152, '000-00-00027'
'크리스피도넛 명지점', 13, null, '000-00-00028'
'북경반점 명지점', 10, null, '000-00-00033'
'진주성 명지점', 10, null, '000-00-00034'
'애슐리 명지점', 10, 343, '000-00-00035'
'VIPS 명지점', 10, 27, '000-00-00036'
'대독장 명지점', 10, null, '000-00-00037'
'목구멍 명지점', 10, null, '000-00-00038'
'마왕족발 명지점', 10, null, '000-00-00039'
'사천횟집 명지점', 10, null, '000-00-00040'
'문현곱창 명지점', 10, null, '000-00-00041'

