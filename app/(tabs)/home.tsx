import React, { useEffect, useState, useRef } from "react";
import { FlatList, Text, Image, View } from "react-native";
import JobCard from "../../components/JobCard";
import ShimmerEffect from "@/components/ShimmerEffect";
import useBookmarkStore from "@/store/bookmarkStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { Job } from "@/types/type";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";

const HomeScreen = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const isFetching = useRef(false);

  const { fetchBookmarkedJobs } = useBookmarkStore();

  const fetchJobs = async () => {
    if (loading || !hasMore || isFetching.current) return;
    isFetching.current = true;
    setLoading(true);
    setError(false); 

    try {
      const response = await fetch(
        `https://testapi.getlokalapp.com/common/jobs?page=${page}`
      );
      if (!response.ok) throw new Error("Failed to fetch jobs");
      const data = await response.json();

      if (data.results.length > 0) {
        setJobs((prevJobs) => [...prevJobs, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError(true);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchBookmarkedJobs();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      {error ? (
        <ErrorState
          title="Failed to Load Jobs"
          subtitle="Something went wrong. Please try again later."
          image={images.error}
        />
      ) : (
        <FlatList
          data={jobs.filter((item) => item.id !== undefined)}
          renderItem={({ item }) => <JobCard job={item} />}
          keyExtractor={(item, index) => `key-${index}`}
          onEndReached={fetchJobs}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading ? <ShimmerEffect /> : null}
          contentContainerStyle={{ paddingBottom: 100 }}
          scrollEventThrottle={16}
          decelerationRate="normal"
          initialNumToRender={10}
          removeClippedSubviews={true}
          ListHeaderComponent={() => (
            <View className="px-4">
              <Image
                source={images.localapp}
                className="h-[40px] mt-4 mb-1"
                resizeMode="contain"
              />
              <Text className="font-psemibold text-xl text-gray-800">
                Latest local Updates for Bharat
              </Text>
            </View>
          )}
          ListEmptyComponent={() =>
            !loading ? (
              <EmptyState
                title="No Jobs Found"
                subtitle="No jobs found in your area."
                image={images.empty}
              />
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
