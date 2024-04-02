import {
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Platform,
} from "react-native";
import BenefitAmountOfYou from "./components/BenefitAmountOfYou";
import ConsumptionOfYou from "./components/ConsumptionOfYou";
import AkaOfYou from "./components/AkaOfYou";
import BenefitGraph from "./components/BenefitGraph";
import CardRanking from "./components/CardRanking";

function StatisticsPage() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.benefit}>
        <BenefitAmountOfYou />
      </View>
      <View style={styles.consumption}>
        <ConsumptionOfYou />
      </View>
      <View style={styles.aka}>
        <AkaOfYou />
      </View>
      <View style={styles.benefitgraph}>
        <BenefitGraph />
      </View>
      <View style={styles.cardranking}>
        <CardRanking />
      </View>
    </ScrollView>
  );
}

export default StatisticsPage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#F7F7F7",
  },
  benefit: {
    flex: 1,
    minHeight: 250,
    zIndex: 1,
  },
  consumption: {
    flex: 2,
    marginBottom: 20,
    minHeight: 610,
    marginTop: -30,
    zIndex: 2,
    position: "relative",
  },
  aka: {
    flex: 1,
    marginBottom: 20,
    minHeight: 300,
  },
  benefitgraph: {
    flex: 1,
    marginBottom: 20,
    minHeight: 570,
  },
  cardranking: {
    flex: 1,
    marginBottom: 20,
    minHeight: 600,
  },
});
