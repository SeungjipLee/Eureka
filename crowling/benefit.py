import json


# JSON 파일 경로
json_file_path = "credit_processing2.json"

# JSON 파일 읽기
with open(json_file_path, "r", encoding="utf-8") as json_file:
    data = json.load(json_file)
    card_info_list = data["data"]
    benefit_info = []
    for card_info in card_info_list:
        info = {}
        info['index'] = card_info['index']
        info['카드이름'] = card_info['카드이름']
        info['혜택'] = []
        for benefit in card_info["주요혜택"]:
            info['혜택'].append({'summary': benefit['desc'], 'detail':benefit['detail_desc']})
        benefit_info.append(info)

    with open("benefit_list_crd.json", "w", encoding="utf-8") as file:
        json.dump({"benefit_data": benefit_info}, file, ensure_ascii=False)
