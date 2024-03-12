import json


# JSON 파일 경로
json_file_path = "credit_crowling.json"

# JSON 파일 읽기
with open(json_file_path, "r", encoding="utf-8") as json_file:
    data = json.load(json_file)
    card_info_list = data["data"]
    category_list = set()
    for card_info in card_info_list:
        for benefit in card_info["주요혜택"]:
            category = benefit["title"]
            category_list.add(category)

    category_list = list(category_list)
    cnt = len(category_list)

    category_data = {"category_list": category_list, "cnt": cnt}

    with open("category_list_crd.json", "w", encoding="utf-8") as file:
        json.dump({"category": category_data}, file, ensure_ascii=False)
