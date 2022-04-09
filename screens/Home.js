import React, { useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ImageBackground,
  Animated,
  ScrollView,
} from "react-native";
import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants";

const Home = ({ navigation }) => {
  const newSeasonScrollX = useRef(new Animated.Value(0)).current;

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Profile */}
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
          }}
        ></TouchableOpacity>
        {/* Screen Mirror */}
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
          }}
          onPress={() => console.log("ScreenMirror")}
        >
          <Image
            source={icons.airplay}
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.primary,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderNewSeasonSection() {
    return (
      <Animated.FlatList
        horizontal
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={SIZES.width}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate={0}
        contentContainerStyle={{
          marginTop: SIZES.radius,
        }}
        data={dummyData.newSeason}
        keyExtractor={(item, index) => item.id.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: newSeasonScrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          return (
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate("MovieDetail", {
                  selectedMovie: item,
                })
              }
            >
              <View
                style={{
                  width: SIZES.width,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Thumbnail */}
                <ImageBackground
                  source={item.thumbnail}
                  resizeMode="cover"
                  style={{
                    width: SIZES.width * 0.85,
                    height: SIZES.width * 0.85,
                    justifyContent: "flex-end",
                  }}
                ></ImageBackground>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}
    >
      {renderHeader()}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        {renderNewSeasonSection()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
