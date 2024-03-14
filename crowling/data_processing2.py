import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.action_chains import ActionChains


# 카드이미지가 가로인지 세로인지 확인하는 코드

webdriver_service = Service(service=Service(ChromeDriverManager().install()))
options = Options()
driver = webdriver.Chrome(service=webdriver_service, options=options)
wait = WebDriverWait(driver, 10)

# JSON 파일 경로
json_file_path = "check_processing1.json"

# JSON 파일 읽기
with open(json_file_path, "r", encoding="utf-8") as json_file:
    data = json.load(json_file)
    card_info_list = data["data"]
    for card_info in card_info_list:
        이미지경로 = card_info["img_path"]
        driver.get(이미지경로)
        try:
            img_element = driver.find_element(By.TAG_NAME, "img")
            img_width = img_element.get_attribute("width")
            img_height = img_element.get_attribute("height")
            if img_width > img_height:
                card_info["img_attr"] = "가로"
            else:
                card_info["img_attr"] = "세로"
            print(card_info["카드이름"] + " : " + card_info["img_attr"])
        except Exception as e:
            card_info["img_path"] = ""
            card_info["img_attr"] = ""
    with open("check_processing2.json", "w", encoding="utf-8") as file:
        json.dump({"data": card_info_list}, file, ensure_ascii=False)
