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
       ("000103", "삼싸피", "01033333333")
;


#4-2. user_card dummy
insert into user_card(user_id, card_id, card_identifier, card_number, card_cvc, card_password, card_member, expired_year, expired_month, token)
values (1, 1, "ce42cfa3f011c5560bb6bf744a32e609bffaf2c1953f61ef92cd75d5ba1aba17", "1000000000000001", "000", "1234", 0, "25", "01", null),
       (1, 1, "3e10f9ada03f6268a79f11dcdd4b19a75d9f5c7bf627b30740d686aeab0f6ec5", "1000000000000002", "000", "1234", 0, "25", "01", null),
       (1, 1, "f8d75b27bb43f303c04891d4c669b5a37543b8873bcd156e65321bf645c9d92a", "1000000000000003", "000", "1234", 0, "25", "01", null),
       (1, 1, "2668d59654d6bf0acd1929f8f27aebffb1be4243079294a5c7071ed308720908", "1000000000000004", "000", "1234", 0, "25", "01", null),
       (1, 1, "cdb9d2053137920a4929560e561589e776210eb014201b6de24b998aa1e0c4fe", "1000000000000005", "000", "1234", 0, "25", "01", null),
       (1, 1, "2ece585d69444b6770f1eaa4982d6fbcfe07628159804252687c1bb9ba684e07", "1000000000000006", "000", "1234", 0, "25", "01", null),

       (2, 1, "793e3bb26b15a933a9505210390dac4cc57f4c0d19adebae515782a847dcfa3f", "2000000000000001", "000", "1234", 0, "25", "01", null),
       (2, 1, "e9760ae2e0f38470c98de435ffa8d53580543e9813b0e709377a94c11c0deb66", "2000000000000002", "000", "1234", 0, "25", "01", null),
       (2, 1, "f9ff9b48b39af2da105b88a6d4fa5dca364f18e913307eb1bed6671158aaa0cd", "2000000000000003", "000", "1234", 0, "25", "01", null),
       (2, 1, "440fdf94f565b75633a5b4cd530c574daf58d89784ec6bb7a69e144b23faefbe", "2000000000000004", "000", "1234", 0, "25", "01", null),
       (2, 1, "93107d63bf900ae6c2d85818c2f69deea0d13189a5f216e0999d2f707bb0c36a", "2000000000000005", "000", "1234", 0, "25", "01", null),
       (2, 1, "cd7a6429d09f5c89b1bfad90be9378547587b2b9cfd418ad9cae9207ff8a153b", "2000000000000006", "000", "1234", 0, "25", "01", null),

       (3, 1, "210685892aac98682648008b06df73039eb3819936f3dddae877a05fd2f7312a", "3000000000000001", "000", "1234", 0, "25", "01", null),
       (3, 1, "8742016dc40b3734eb0be058c85c93cebe6b0f37773c7306f40835c3c965653b", "3000000000000002", "000", "1234", 0, "25", "01", null),
       (3, 1, "0cfac32761a8ed21ee94509a17eb3d573646a3bf4d7bd894e3b7ef4bc4fde0c2", "3000000000000003", "000", "1234", 0, "25", "01", null),
       (3, 1, "07956d23cc706157732027953d5fb1017b9142b7f221728caf1254be1e5affe1", "3000000000000004", "000", "1234", 0, "25", "01", null),
       (3, 1, "40128a911fbde97eb0128d09f5aac92c685a7e3c3bcd62b29af89b672535c8c5", "3000000000000005", "000", "1234", 0, "25", "01", null),
       (3, 1, "7e9e774994ebff2c618bc26dcabbb31885f3de6a140536faa75f9a692d286085", "3000000000000006", "000", "1234", 0, "25", "01", null)
;


#5-2. card_history dummy
# insert into card_history(user_card_id, status, pay_type, approved_num, approved_dtime, approved_amt, trans_dtime, modified_amt, merchant_name, merchant_regno, total_install_cnt, large_category_id, small_category_id)
# VALUES ();


