import subprocess

# 파이썬 파일 리스트
files = ["crowling_card_data.py", "data_processing1.py", "data_processing2.py"]

# 각 파일을 순차적으로 실행
for file in files:
    subprocess.run(["python", file])
