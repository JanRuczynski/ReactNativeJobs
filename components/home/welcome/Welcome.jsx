import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

const jobTypes = [
  { en: "Full-time", pl: "Pełny etat" },
  { en: "Part-time", pl: "Część etatu" },
  { en: "Contractor", pl: "Kontraktor" },
];

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-time");

  const getTranslatedJobType = (type) => {
    const translatedType = jobTypes.find((jobType) => jobType.en === type);
    return translatedType ? translatedType.pl : type;
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Witaj, Szymon!</Text>
        <Text style={styles.welcomeMessage}>Znajdź swoją wymarzoną pracę</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder='Jakiej pracy szukasz?'
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item.en)}
              onPress={() => {
                setActiveJobType(item.en);
                router.push(`/search/${item.en}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>
                {getTranslatedJobType(item.en)}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.en}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
