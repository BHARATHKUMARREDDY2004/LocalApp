import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, Linking } from "react-native";
import { useLocalSearchParams } from "expo-router";
import useBookmarkStore from "@/store/bookmarkStore";
import { Ionicons } from "@expo/vector-icons";
import ErrorState from "@/components/ErrorState"; 
import { Job } from '@/types/type';
import { images } from "@/constants";


const JobDetails = () => {
  const { id, job } = useLocalSearchParams();
  const [error, setError] = useState(false);

  let jobData: Job | null = null;

  try {
    jobData = job ? JSON.parse(job as string) : null;
  } catch (err) {
    console.error("Error parsing job data:", err);
    setError(true);
  }

  // Bookmark state and logic
  const [isBookmarkedState, setIsBookmarkedState] = useState(false);
  const { addBookmark, removeBookmark, isBookmarked, fetchBookmarkedJobs } = useBookmarkStore();

  useEffect(() => {
    try {
      fetchBookmarkedJobs();
      if (jobData) {
        setIsBookmarkedState(isBookmarked(jobData.id));
      }
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
      setError(true);
    }
  }, [jobData]);

  if (error || !jobData) {
    return (
      <ErrorState
        title="Job Details Not Found"
        subtitle="There was an issue loading this job. Please try again later."
        image={images.error}
      />
    );
  }

  const toggleBookmark = () => {
    if (isBookmarkedState) {
      removeBookmark(jobData.id);
    } else {
      addBookmark(jobData);
    }
    setIsBookmarkedState(!isBookmarkedState);
  };

  return (
    <>
      <ScrollView className="px-4">
        {/* Job Image */}
        {jobData.creatives?.[0]?.file && (
          <Image
            source={{ uri: jobData.creatives[0].file }}
            className="w-full h-56 rounded-lg my-4"
            resizeMode="cover"
          />
        )}
        <Text className="text-lg font-pbold">{jobData.title}</Text>

        <View className="flex flex-row items-center justify-between">
          {jobData.status === 1 ? (
            <Text className="bg-green-500/20 text-green-500 px-2 py-1 rounded-md w-[27%]">
              Actively Hiring
            </Text>
          ) : (
            <Text className="bg-red-500/20 text-red-500 px-2 py-1 rounded-md w-[60%]">
              No more applications are accepted
            </Text>
          )}

          <TouchableOpacity onPress={toggleBookmark} className="px-2 py-4">
            <Ionicons
              name={isBookmarkedState ? "bookmark" : "bookmark-outline"}
              size={24}
              color={isBookmarkedState ? "#ffbc04" : "black"}
            />
          </TouchableOpacity>
        </View>

        {/* Job Details */}
        <Text className="text-gray-600">Location: {jobData.primary_details?.Place}</Text>
        <Text className="text-gray-600">Salary: {jobData.primary_details?.Salary}</Text>
        <Text className="text-gray-600">Job Type: {jobData.primary_details?.Job_Type}</Text>
        <Text className="text-gray-600">Experience: {jobData.primary_details?.Experience}</Text>
        <Text className="text-gray-600">Qualification: {jobData.primary_details?.Qualification}</Text>

        {/* Company Information */}
        <Text className="text-lg font-pbold mt-4">Company Details</Text>
        <Text className="text-gray-600">Company Name: {jobData.company_name}</Text>
        <Text className="text-gray-600">Contact: {jobData.whatsapp_no}</Text>

        {/* Job Tags */}
        <Text className="text-lg font-pbold mt-4">Job Tags</Text>
        <Text className="text-gray-600">{jobData.job_tags?.[0]?.value}</Text>

        {/* Additional Details */}
        <Text className="text-lg font-pbold mt-4">Additional Details</Text>
        <Text className="text-gray-600">Job Hours: {jobData.job_hours}</Text>
        <Text className="text-gray-600">Openings: {jobData.openings_count}</Text>
        <Text className="text-gray-600">Job Role: {jobData.job_role}</Text>
        <Text className="text-gray-600">Job Category: {jobData.job_category}</Text>
        <Text className="text-gray-600">Number of Applications: {jobData.num_applications}</Text>

        {/* Content Details */}
        <Text className="text-lg font-pbold mt-4">Content Details</Text>
        {jobData.contentV3?.V3?.map((item, index) => (
          <View key={index} className="mb-2">
            <Text className="text-gray-600 font-pbold">{item.field_name}</Text>
            <Text className="text-gray-600">{item.field_value}</Text>
          </View>
        ))}

        {/* Fee Details */}
        <Text className="text-lg font-pbold mt-4">Fee Details</Text>
        <Text className="text-gray-600">Fees Charged: {jobData.fees_charged}</Text>

        {/* Status and Expiry */}
        <Text className="mt-4">
          <Text className="text-lg font-pbold mt-4">Expires On:</Text>{" "}
          <Text className="text-gray-600">{jobData.expire_on.split("T")[0]}</Text>
        </Text>
      </ScrollView>

      {/* Contact Options */}
      <View className="px-4 py-2">
        <TouchableOpacity
          className="mt-2 p-3 bg-blue-600 rounded-lg"
          onPress={() => Linking.openURL(jobData.custom_link)}
        >
          <Text className="text-white text-center font-psemibold">📞 Call HR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-2 p-3 bg-green-600 rounded-lg"
          onPress={() => Linking.openURL(jobData.contact_preference.whatsapp_link)}
        >
          <Text className="text-white text-center font-psemibold">💬 WhatsApp HR</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default JobDetails;
