import { Redirect, Tabs } from "expo-router";
import { Image, Text, View, TouchableOpacity } from "react-native";

import { icons } from "@/constants";
import { TabIconProps } from "@/types/type";

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View className="flex items-center justify-center w-24 h-20 mt-9">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-9 h-9"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-md`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#ffbc04",
          tabBarInactiveTintColor: "#5C636E",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#FFFF",
            borderRadius: 100,
            height: 70,
            width: "50%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "column",
            position: "absolute",
            overflow: "hidden",
            marginBottom: 10,
            transform: [{ translateX: "50%" }],
          },
        }}
      >
        <Tabs.Screen
          name="jobs"
          options={{
            title: "Jobs",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.jobs}
                color={color}
                name="Jobs"
                focused={focused}
              />
            ),
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                activeOpacity={1}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmarks"
          options={{
            title: "Bookmarks",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Bookmarks"
                focused={focused}
              />
            ),
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                activeOpacity={1}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;