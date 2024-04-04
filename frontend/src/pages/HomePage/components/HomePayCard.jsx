import React from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function HomePayCard() {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.header}>
        <Image
          source={require("../../../../assets/loading.png")}
          style={{
            width: 130,
            height: 120,
            borderRadius: 10,
            marginStart: 20,
          }}
        />
        <View style={{ marginLeft: -20, marginBottom: -20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000000" }}>
            당신을 위한
          </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000000" }}>
            카드 추천 서비스
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#6797ff" }}>
            유레카!
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("SettingPage")}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1, // 눌렀을 때 시각적 피드백을 제공합니다.
            },
            styles.settingIcon,
          ]}
        >
          <MaterialCommunityIcons
            name="cog-outline"
            size={30}
            color={"#9E9797"}
          />
        </Pressable>
      </View>
    </View>
  );
}

export default HomePayCard;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
  },
  easyPay: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: 50,
    color: "#6797ff",
  },
  settingIcon: {
    padding: 10, // 아이콘 주변의 터치 영역을 늘립니다.
    alignSelf: "center",
    marginRight: 20,
    marginTop: -50,
  },
});
