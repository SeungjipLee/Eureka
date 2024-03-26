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
# insert into small_category(category_name, large_category_id)
# values ();


#4-2. card dummy


#5-2. card_benefit dummy


#6-2. card_benefit_detail dummy


#7-2. user dummy


#8-2. user_card dummy



#9-2. pay_history dummy

#10-2. partnership_store dummy
# insert into partnership_store(small_category_id, store_code, store_name, store_reg_no)
# values ('', 'gs1vu5sd7ml9wj2a4kic', 'GS편의점', '123-12-12345'),
#        ();



#11-2. consumption_static dummy
#12-2. consumption_large_static dummy
#13-2. consumption_detail_history dummy
#14-2. discount_static dummy
#15-2. discount_detail dummy
#16-2. discount_detail_history dummy