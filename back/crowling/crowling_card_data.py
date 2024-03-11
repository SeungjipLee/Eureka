import time
import json
import re
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.action_chains import ActionChains

webdriver_service = Service(service=Service(ChromeDriverManager().install()))

options = Options()
# options.add_experimental_option("detach", True)
# options.add_experimental_option("excludeSwitches",["enable-logging"])
# options.add_argument('--headless')  # 브라우저 창 숨기기
data_list = []
driver = webdriver.Chrome(service=webdriver_service, options=options)
wait = WebDriverWait(driver, 20)

try:
    driver.get("https://www.card-gorilla.com/search/card?cate=CHK")
    # 팝업창 제거
    # exit_popup_button_locator = (By.XPATH, "/html/body/div[4]/div[2]/div/button")
    # e_btn = wait.until(EC.element_to_be_clickable(exit_popup_button_locator))
    # e_btn.click()
    # 더보기 버튼 전부 클릭
    while True:
        try:
            # more_button = driver.find_element(
            #     By.XPATH,
            #     '//*[@id="q-app"]/section/div[1]/section/div/article[1]/article/a',
            # )
            more_button = wait.until(
                EC.presence_of_element_located(
                    (
                        By.XPATH,
                        '//*[@id="q-app"]/section/div[1]/section/div/article[1]/article/a',
                    )
                )
            )
            ActionChains(driver).move_to_element(more_button).perform()
            time.sleep(0.5)
            more_button.click()
        except Exception as e:
            print("button is burn")
            break

    ul_element = driver.find_element(By.XPATH, '//ul[@class="lst"]')
    li_elements = ul_element.find_elements(By.TAG_NAME, "li")

    for idx, li in enumerate(li_elements):
        try:
            detail_btn = li.find_element(By.XPATH, './/a[@class="b_view"]')
            # detail_btn = li.find_element(By.TAG_NAME, "a")
        except Exception:
            continue

        while True:
            time.sleep(0.5)
            ActionChains(driver).move_to_element(detail_btn).key_down(
                Keys.CONTROL
            ).click(detail_btn).key_up(Keys.CONTROL).perform()
            # 제어 이동 (카드 상세 정보 페이지)
            time.sleep(1)
            driver.switch_to.window(driver.window_handles[1])
            if driver.current_url != "https://www.card-gorilla.com/home":
                break
            driver.close()
            driver.switch_to.window(driver.window_handles[0])

        # 스크래핑
        card_data = {}
        card_data["index"] = idx
        # 카드 이름 저장
        time.sleep(0.5)
        name = wait.until(
            EC.visibility_of_element_located((By.XPATH, '//strong[@class="card"]'))
        )
        card_data["카드이름"] = name.text
        # 카드사 저장
        cop_name = wait.until(
            EC.presence_of_element_located((By.XPATH, '//p[@class="brand"]'))
        )
        card_data["카드사"] = cop_name.text

        # 연회비 + 전월 실적 + 브랜드 저장
        연회비_전월실적div = driver.find_element(By.XPATH, '//div[@class="bnf2"]')
        하위태그dl들 = 연회비_전월실적div.find_elements(By.TAG_NAME, "dl")
        분류 = ["연회비", "전월실적"]
        for i, dl in enumerate(하위태그dl들):
            # 연회비 저장
            if i == 0:
                연회비_dict = {}  # 연회비 정보를 담을 딕셔너리 초기화
                연회비_목록 = re.findall(
                    r"(국내전용|해외겸용)\s*(없음|[\d,]+원)", dl.text
                )
                for key, value in 연회비_목록:
                    if value != "없음":
                        value = int(value.replace(",", "").replace("원", ""))
                    연회비_dict[key] = value
                card_data[분류[i]] = 연회비_dict

            # 전월실적 저장
            elif i == 1:
                dl.text.replace("전월실적", "")
                card_data[분류[i]] = dl.text

        # # 브랜드는 고려 x
        # # 브랜드 가공
        # if "브랜드" in card_data:
        #     브랜드_원본 = card_data["브랜드"]
        #     브랜드_목록 = []  # 브랜드 정보를 담을 리스트 초기화
        #     if "AMEX" in 브랜드_원본:
        #         브랜드_목록.append("AMEX")
        #     if "VISA" in 브랜드_원본:
        #         브랜드_목록.append("VISA")
        #     if "mastercard" in 브랜드_원본:
        #         브랜드_목록.append("mastercard")
        #     card_data["브랜드"] = 브랜드_목록  # 가공된 브랜드 정보로 업데이트

        # 주요 혜택
        주요혜택들 = []
        root_dl = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located(
                (By.XPATH, '//div[@class="lst bene_area"]')
            )
        )
        dl_list = root_dl.find_elements(By.TAG_NAME, "dl")

        viewport_width = driver.execute_script("return window.innerWidth;")
        viewport_height = driver.execute_script("return window.innerHeight;")
        for dl in dl_list:
            dl_location = dl.location
            scroll_x = dl_location["x"] - (viewport_width / 2)
            scroll_y = dl_location["y"] - (viewport_height * 0.1)
            time.sleep(0.1)
            driver.execute_script("window.scrollTo({}, {});".format(scroll_x, scroll_y))
            time.sleep(0.1)
            dl.click()
            WebDriverWait(dl, 10).until(
                EC.presence_of_element_located((By.TAG_NAME, "dd"))
            )
            title = dl.find_element(By.TAG_NAME, "p").text
            desc = dl.find_element(By.TAG_NAME, "i").text
            detail_desc = dl.find_element(By.TAG_NAME, "dd").text
            주요혜택 = {"title": title, "desc": desc, "detail_desc": detail_desc}
            주요혜택들.append(주요혜택)
        card_data["주요혜택"] = 주요혜택들

        # 카드 이미지 경로
        card_img = driver.find_element(By.XPATH, '//div[@class="card_img"]')
        img_tag = card_img.find_element(By.TAG_NAME, "img")
        card_data["img_path"] = img_tag.get_attribute("src")

        # 카드사 바로가기 에서 이어지는 경로 저장
        register_path = ""
        div_area = driver.find_element(By.XPATH, '//div[contains(@class,"data_area")]')
        app_btn = div_area.find_element(By.XPATH, '//div[@class="app_btn"]')
        if app_btn.text != "":
            register_path = driver.current_url
        card_data["register_path"] = register_path

        # 두 번째 창도 닫고 원래 창으로 제어 이동
        driver.close()
        driver.switch_to.window(driver.window_handles[0])

        # 출력부
        data_list.append(card_data)
        print(len(data_list), card_data["카드이름"])
finally:
    print(len(data_list))
    with open("check_crowling.json", "w", encoding="utf-8") as file:
        json.dump({"data": data_list}, file, ensure_ascii=False)
