package com.ssafy.eureka.domain.card.util;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.ssafy.eureka.domain.card.dto.CardEntity;
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

public class CarDataUtil {
    private final static String directoryPath = "../crowling/data";

    public static void main(String[] args) {
        cardProductFileLoad();
    }

    /*
        카드 정보를 가져오는 API가 존재하지 않아
        크롤링을 통해 JSON File을 만들고 File을 읽어 DB에 저장
     */
    public static void cardProductFileLoad () {
        Gson gson = new Gson();

        File folder = new File(directoryPath);
        File[] listOfFiles = folder.listFiles();



        if (listOfFiles != null) {
            for (File file : listOfFiles) {
                if (file.isFile() && file.getName().endsWith(".json")) {
                    try {
                        String content = new String(Files.readAllBytes(file.toPath()), StandardCharsets.UTF_8);
                        JsonElement jsonElement = gson.fromJson(content, JsonElement.class);
                        JsonArray jsonArray = jsonElement.getAsJsonObject().getAsJsonArray("data");

                        String cardType = file.getName().substring(5);
                        if(cardType.equals("check")){
                            cardType = "0";
                        }else if(cardType.equals("credi")){
                            cardType = "1";
                        }else{
                            cardType = "2";
                        }

                        for (JsonElement element : jsonArray) {
                            Object obj = gson.fromJson(element, Object.class);

                            // 여기서 obj를 DB에 저장하자.

                            // 1. 카드 저장
                            CardEntity card = new CardEntity(obj);


                            // 2. 카드 혜택 정보 저장


                            // 3. 카드 혜택 상세 정보 저장


                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }
}
