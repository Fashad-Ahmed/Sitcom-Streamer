import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

import ProgressBar from "../components/ProgressBar";

import { COLORS, SIZES, FONTS, icons } from "../constants";

const MovieDetail = ({ navigation, route }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  function renderHeaderBar() {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: Platform.OS === "ios" ? 40 : 20,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Back */}
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.transparentBlack,
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.left_arrow}
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
        {/* Share */}
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.transparentBlack,
          }}
          onPress={() => console.log("Share")}
        >
          <Image
            source={icons.upload}
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  const renderHeaderSection = () => {
    return (
      <ImageBackground
        source={selectedMovie?.details?.image}
        resizeMode="cover"
        style={{
          width: "100%",
          height: SIZES.height < 700 ? SIZES.height * 0.6 : SIZES.height * 0.7,
        }}
      >
        <View style={{ flex: 1 }}>
          {renderHeaderBar()}
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["transparent", "#000"]}
              style={{
                width: "100%",
                height: 150,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {/* Season */}
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h4,
                }}
              >
                {selectedMovie?.details?.season}
              </Text>

              {/* Name */}
              <Text
                style={{
                  marginTop: SIZES.base,
                  color: COLORS.white,
                  ...FONTS.h1,
                }}
              >
                {selectedMovie?.name}
              </Text>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>
    );
  };

  const renderCategoryAndRatings = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.base,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Age */}
        <View
          style={[
            styles.categoryContainer,
            {
              marginLeft: 0,
            },
          ]}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h4,
            }}
          >
            {selectedMovie?.details?.age}
          </Text>
        </View>
        {/* Genre */}
        <View
          style={[
            styles.categoryContainer,
            {
              paddingHorizontal: SIZES.padding,
            },
          ]}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h4,
            }}
          >
            {selectedMovie?.details?.genre}
          </Text>
        </View>
        {/* Ratings */}
        <View style={styles.categoryContainer}>
          <Image
            source={icons.star}
            resizeMode="contain"
            style={{
              width: 15,
              height: 15,
            }}
          />

          <Text
            style={{
              marginLeft: SIZES.base,
              color: COLORS.white,
              ...FONTS.h4,
            }}
          >
            {selectedMovie?.details?.ratings}
          </Text>
        </View>
      </View>
    );
  };

  const renderMovieDetails = () => {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.padding,
          justifyContent: "space-around",
        }}
      >
        {/* Title and Progress Bar */}

        <View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                flex: 1,
                color: COLORS.white,
                ...FONTS.h4,
              }}
            >
              {selectedMovie?.details?.currentEpisode}
            </Text>
            <Text
              style={{
                marginLeft: SIZES.base,
                color: COLORS.white,
                ...FONTS.h4,
              }}
            >
              {selectedMovie?.details?.runningTime}
            </Text>
          </View>
          <ProgressBar
            containerStyle={{
              marginTop: SIZES.radius,
            }}
            barStyle={{
              height: 3,
            }}
            barPercentage={selectedMovie?.details?.progress}
          />
        </View>

        {/* Watch */}
        <TouchableOpacity
          style={{
            height: 60,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: Platform.OS === "android" ? SIZES.padding * 2 : 0,
            borderRadius: 20,
            backgroundColor: COLORS.primary,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
            }}
          >
            {selectedMovie?.details?.progress == "0%"
              ? "WATCH NOW"
              : "CONTINUE WATCHING"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    let { selectedMovie } = route.params;

    // console.log(selectedMovie);
    setSelectedMovie(selectedMovie);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}
      style={{ backgroundColor: COLORS.black }}
    >
      {/* Header */}
      {renderHeaderSection()}

      {/* Category & Ratings */}
      {renderCategoryAndRatings()}

      {/* Movie Details */}
      {renderMovieDetails()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: SIZES.base,
    paddingHorizontal: SIZES.base,
    paddingVertical: 3,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.gray1,
  },
});

export default MovieDetail;
