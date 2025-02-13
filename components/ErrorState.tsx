import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images } from "@/constants";
import CustomButton from "./CustomButton";

import { ErrorStateProps } from "@/types/type";

const ErrorState = ({ title, subtitle, image }: ErrorStateProps) => {
  return (
    <View className="flex justify-center items-center px-4 py-[20%]">
      <Image
        source={image || images.error}
        resizeMode="contain"
        className="w-[270px] h-[216px]"
      />

      <Text className="text-md font-psemibold text-black-400">{title}</Text>
      <Text className="text-xl text-center font-psemibold text-black-500 mt-2">
        {subtitle}
      </Text>

      <CustomButton
        title="Try Again"
        onPress={() => router.back()}
        textStyle="text-white"
        className="w-full my-5 bg-red-500"
      />
    </View>
  );
};

export default ErrorState;