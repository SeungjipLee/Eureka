package com.ssafy.eureka.util;

import com.ssafy.eureka.common.exception.CustomException;
import com.ssafy.eureka.common.response.ResponseCode;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Hex;
import org.springframework.stereotype.Component;

@Component
public class AesUtil {

    private static final String privateKey_256 = "AkRI0Qv0xXhK72I1UlAajeHBTvvM8QHk";

    public static String encrypt(String plainText) {
        try{
            SecretKeySpec secretKey = new SecretKeySpec(privateKey_256.getBytes("UTF-8"), "AES");
            IvParameterSpec IV = new IvParameterSpec(privateKey_256.substring(0, 16).getBytes());

            Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
            c.init(Cipher.ENCRYPT_MODE, secretKey, IV);

            byte[] encryptionByte = c.doFinal(plainText.getBytes("UTF-8"));

            return Hex.encodeHexString(encryptionByte);
        } catch (Exception e){
            throw new CustomException(ResponseCode.AES_ERROR);
        }
    }

    public static String decrypt(String encodeText) {
        try{
            SecretKeySpec secretKey = new SecretKeySpec(privateKey_256.getBytes("UTF-8"), "AES");
            IvParameterSpec IV = new IvParameterSpec(privateKey_256.substring(0, 16).getBytes());

            Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
            c.init(Cipher.DECRYPT_MODE, secretKey, IV);

            byte[] decodeByte = Hex.decodeHex(encodeText.toCharArray());

            return new String(c.doFinal(decodeByte), "UTF-8");
        } catch (Exception e){
            throw new CustomException(ResponseCode.AES_ERROR);
        }
    }
}
