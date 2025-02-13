import React from "react";
import { View } from "react-native";

const ShimmerEffect = () => {
  return (
    <>
      <View className="p-4 border-b border-gray-200">
        <View className="h-6 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></View>
        <View className="h-4 bg-gray-300 rounded w-1/2 mb-2 animate-pulse"></View>
        <View className="h-6 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></View>
        <View className="h-4 bg-gray-300 rounded w-1/2 mb-2 animate-pulse"></View>
        <View className="h-4 bg-gray-300 rounded w-1/3 animate-pulse"></View>
      </View>
    </>
  );
};

export default ShimmerEffect;
