#5-2. card_history dummy

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


# insert into card_history(user_card_id, status, pay_type, approved_num, approved_date_time, approved_amt, trans_date_time, modified_amt, merchant_name, merchant_regno, total_install_cnt, large_category_id, small_category_id)
# values ();

user_card_id는 1 ~ 6번 랜덤으로 해줘
status, pay_type은 모두 0으로 해줘
approved_num은 8자리 숫자로 랜덤하게 해줘
approved_date_time는 그럴듯하게 너가 만들어줘
trans_date_time은 모두 null로 해줘
modified_amt는 모두 null로 해줘
merchant_name은 아래의 목록에서 하나 골라줘
merchant_regno는 '000-00-00000'의 형태로 너가 만들어줘
total_install_cnt는 모두 null로 해줘
large_category_id, small_category_id는 merchant_name에 같이 써놓을게.

2023년 12월 1일부터 2024년 3월 27일까지 하루의 3 ~ 10건 이내로 해서 만들어줘 그러면 400 ~ 800건 정도?



merchant 목록
'스타벅스 명륜점'
'커피빈 명륜점'

'CU편의점 명륜점'
'GS25 명륜점'
'이마트24 명륜점'

'배달의 민족'
'요기요'

'에버랜드'
'여기어때'

'지하철'
'택시'

'롯데리아 명륜점'
'KFC 명륜점'

'박승철 헤어스투디오 명륜점'

'NC백화점 명륜점'
'쿠팡'

'S-OIL 명륜점'
'KTX'

'미소된장'
'김치마을'

'우메코지'
'후지산정'

'북경반점'
'진주성'

'애슐리'
'VIPS'



