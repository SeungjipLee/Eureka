use eureka_db;

#1-2. card_company dummy
INSERT INTO card_company(company_name, org_code, card_brand, image_path)
VALUES  ("KB국민카드", "KB1N5V9I3W", "11", ""),
        ("삼성카드", "S1P9V6G2T4", "51", ""),
        ("NH농협카드", "NH3O8Z7L3N", "91", ""),
        ("신한카드", "SH1D5T3K9S", "41", ""),
        ("현대카드", "HD9P5Q7L2T", "61", ""),
        ("하나카드", "HN1C2M3S5K", "21", ""),
        ("우리카드", "WR9R2L4Z5A", "W1", ""),
        ("IBK기업은행카드", "IB1C3M5Q7P", "3K", ""),
        ("롯데카드", "RD3L5Q8P7S", "71", "")
;


#2-2. large_category dummy
insert into large_category(category_name)
values ("모든가맹점"), ("대중교통"), ("주유"), ("마트"), ("편의점"), ("통신"), ("온라인쇼핑"), ("쇼핑"), ("배달앱"), ("음식점"), ("주점"), ("카페"), ("디저트"), ("뷰티/피트니스"),
       ("공과금"), ("병원/약국"), ("애완동물"), ("교육"), ("자동차"), ("레저/스포츠"), ("영화"), ("문화/여가"), ("간편결제"), ("항공"), ("여행/숙박"), ("기타")
;


#3-2. small_category dummy

#4-2. card dummy

#5-2. card_benefit dummy

#6-2. card_benefit_detail dummy

#7-2. user dummy
# 회원가입부터 시작하기.

#8-2. user_card dummy
# 유저카드 등록부터 시작하기.

#9-2. partnership_store dummy
insert into partnership_store(small_category_id, store_code, store_name, store_reg_no)
values ('', '4e9809439837e422adc2c33c51964695cc22f198', 'GS 편의점', '123-12-12345'),
       ('', '30b3e091a17fbde050b44dd711b4b15b30eead5c', '에버랜드', '641-123-74578'),
       ('', '91216fdbe461605c71dd4c35227a1357552a33dc', '파리바게트', '123-12-12345'),
       ('', 'a9ceec3088285d7c35c7b078ed676fd6b2f15d9c', '교보문고', '123-12-12345'),
       ('', '599e8800d31f2e927418f0e64a9bbf2504ba63e0', '올리브영', '123-12-12345'),
       ('', 'c85f681d748975555ca7895ada8fc10a7bc07db9', '롯데백화점', '123-12-12345'),
       ('', '1e62ac090e7665546aa46cbd9bc37651916d2806', '옥션', '123-12-12345'),
       ('', 'e9f557f4517361121af41dff563febf710432b45', '이마트', '123-12-12345'),
       ('', '3c8d535393468a2c023d3ca197c3d0f407f0dffb', '롯데리아', '123-12-12345'),
       ('', '0e4f287bee0e2addd1d9ce69af63828f5b40043c', 'S-OIL', '123-12-12345')
;


#10-2. pay_history dummy
#11-2. consumption_static dummy
#12-2. consumption_large_static dummy
#13-2. consumption_detail_history dummy
#14-2. discount_static dummy
#15-2. discount_detail dummy
#16-2. discount_detail_history dummy