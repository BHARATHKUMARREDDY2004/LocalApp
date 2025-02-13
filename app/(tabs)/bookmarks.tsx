import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import useBookmarkStore from "@/store/bookmarkStore";
import JobCard from "@/components/JobCard";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import { images } from "@/constants";

const BookmarksScreen = () => {
  const { bookmarkedJobs, fetchBookmarkedJobs } = useBookmarkStore();
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      fetchBookmarkedJobs();
    } catch (err) {
      console.error("Error fetching bookmarked jobs:", err);
      setError(true);
    }
  }, []);

  return (
    <View className="flex-1">
      <Text className="text-xl font-pbold p-4">Bookmarks</Text>

      {error ? (
        <ErrorState
          title="Failed to Load Bookmarks"
          subtitle="Something went wrong. Please try again later."
          image={images.error}
        />
      ) : (
        <FlatList
          data={bookmarkedJobs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <JobCard job={item} />}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Bookmarks Found"
              subtitle="You haven't bookmarked anything yet."
              image={images.empty}
            />
          )}
        />
      )}
    </View>
  );
};

export default BookmarksScreen;
