use card_db;

# 1-2. card_company dummy
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

#2-2. card dummy
# insert into card(card_company_id, card_type, card_name, annual_fee, previous_performance, caution, image_path, join_path, is_expired)
# values();


#3-2. user dummy
insert into user(birth, name, phone_number)
values ("000101", "일싸피", "01011111111"),
       ("000102", "이싸피", "01022222222"),
       ("000103", "삼싸피", "01033333333");


#4-2. user_card dummy
# insert into user_card(user_id, carD_id, card_identifier, card_number, card_cvc, card_password, card_member, expired_year, expired_month, token)
# values ();


#5-2. card_history dummy
# insert into card_history(user_card_id, status, pay_type, approved_num, approved_dtime, approved_amt, trans_dtime, modified_amt, merchant_name, merchant_regno, total_install_cnt, large_category_id, small_category_id)
# VALUES ();


