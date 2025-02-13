import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Job } from '@/types/type';

const useBookmarkStore = create((set) => ({
  bookmarkedJobs: [],

  // Fetches bookmarked jobs from AsyncStorage
  fetchBookmarkedJobs: async () => {
    const storedJobs = await AsyncStorage.getItem('bookmarkedJobs');
    if (storedJobs) {
      set({ bookmarkedJobs: JSON.parse(storedJobs) });
    }
  },

  // Adds a job to bookmarks
  addBookmark: async (job : Job) => {
    set((state) => {
      const updatedJobs = [...state.bookmarkedJobs, job];
      AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(updatedJobs));
      return { bookmarkedJobs: updatedJobs };
    });
  },

  // Removes a job from bookmarks
  removeBookmark: async (jobId : number) => {
    set((state) => {
      const updatedJobs = state.bookmarkedJobs.filter((job : Job) => job.id !== jobId);
      AsyncStorage.setItem('bookmarkedJobs', JSON.stringify(updatedJobs));
      return { bookmarkedJobs: updatedJobs };
    });
  },

  // Checkes if a job is bookmarked
  isBookmarked: (jobId : number) => {
    return useBookmarkStore.getState().bookmarkedJobs.some((job : Job) => job.id === jobId);
  },

  clearBookmarks: async () => {
    await AsyncStorage.removeItem('bookmarkedJobs');
    set({ bookmarkedJobs: [] });
  },
}));

export default useBookmarkStore;