import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useBookmarkStore from "@/store/bookmarkStore";

const JobCard = React.memo(({ job }:any) => {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);

  useEffect(() => {
    const checkIsBookmarked = () => {
      setIsBookmarkedState(isBookmarked(job.id));
    };

    checkIsBookmarked();

    const unsubscribe = useBookmarkStore.subscribe(checkIsBookmarked);

    return () => unsubscribe();
  }, [job.id, isBookmarked]);

  const toggleBookmark = () => {
    if (isBookmarkedState) {
      removeBookmark(job.id);
    } else {
      addBookmark(job);
    }
  };

  return (
    <View className="p-4 border border-gray-200 mx-2 my-1 rounded-xl bg-white">
      <Link
        href={{
          pathname: `/job-details/${job.id}`,
          params: { job: JSON.stringify(job) },
        }}
      >
        <View className="flex flex-row items-center">
          {/* Image */}
          <Image
            source={{ uri: job.creatives[0].file }}
            className="w-[30%] rounded-xl"
            resizeMode="cover"
            style={{ height: 100 }}
          />

          {/* Job Details */}
          <View className="flex-1 px-4">
            <Text
              className="text-[16px] font-psemibold"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {job.title.length > 60
                ? `${job.title.slice(0, 50)}...`
                : job.title}
            </Text>
            <Text className="text-gray-600">
              Location:{" "}
              {job.primary_details?.Place.length > 20
                ? `${job.primary_details?.Place.slice(0, 20)}...`
                : job.primary_details?.Place}
            </Text>
            <Text className="text-gray-600">
              Salary:{" "}
              {job.primary_details?.Salary.length > 1
                ? job.primary_details?.Salary.length > 20
                  ? `${job.primary_details?.Salary.slice(0, 20)}...`
                  : job.primary_details?.Salary
                : "Not mentioned"}
            </Text>

            <Text className="text-gray-600">
              Phone:{" "}
              {job.custom_link
                ? job.custom_link.replace("tel:", "")
                : "not mentioned"}
            </Text>
          </View>

          {/* Bookmark Button */}
          <TouchableOpacity onPress={toggleBookmark} className="px-2 py-4">
            <Ionicons
              name={isBookmarkedState ? "bookmark" : "bookmark-outline"}
              size={24}
              color={isBookmarkedState ? "#ffbc04" : "black"}
            />
          </TouchableOpacity>
        </View>
      </Link>
    </View>
  );
});

export default JobCard;
