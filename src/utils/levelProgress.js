// Level Progress Management System
// Tracks completed levels for each activity to prevent skipping

const STORAGE_KEY = 'douglasCampsLevelProgress';

// Get all level progress data
export const getLevelProgress = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error reading level progress:', error);
    return {};
  }
};

// Get completed levels for a specific activity
export const getCompletedLevels = (activityId) => {
  const progress = getLevelProgress();
  return progress[activityId] || [];
};

// Get the highest unlocked level for an activity
export const getHighestUnlockedLevel = (activityId) => {
  const completedLevels = getCompletedLevels(activityId);
  if (completedLevels.length === 0) {
    return 1; // Level 1 is always unlocked
  }
  return Math.max(...completedLevels) + 1; // Next level after highest completed
};

// Check if a level is unlocked
export const isLevelUnlocked = (activityId, level) => {
  if (level === 1) return true; // Level 1 is always unlocked
  
  const completedLevels = getCompletedLevels(activityId);
  const highestCompleted = completedLevels.length > 0 ? Math.max(...completedLevels) : 0;
  
  // A level is unlocked if:
  // 1. It has been completed before, OR
  // 2. It's the next level after the highest completed level
  return completedLevels.includes(level) || level <= highestCompleted + 1;
};

// Mark a level as completed
export const completeLevel = (activityId, level) => {
  try {
    const progress = getLevelProgress();
    
    if (!progress[activityId]) {
      progress[activityId] = [];
    }
    
    // Add level to completed if not already there
    if (!progress[activityId].includes(level)) {
      progress[activityId].push(level);
      progress[activityId].sort((a, b) => a - b); // Keep sorted
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return true;
  } catch (error) {
    console.error('Error saving level progress:', error);
    return false;
  }
};

// Reset progress for an activity (for testing or "play again")
export const resetActivityProgress = (activityId) => {
  try {
    const progress = getLevelProgress();
    delete progress[activityId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return true;
  } catch (error) {
    console.error('Error resetting activity progress:', error);
    return false;
  }
};

// Reset all progress (for testing)
export const resetAllProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error resetting all progress:', error);
    return false;
  }
};

// Get progress percentage for an activity
export const getProgressPercentage = (activityId, totalLevels = 10) => {
  const completedLevels = getCompletedLevels(activityId);
  return Math.round((completedLevels.length / totalLevels) * 100);
};

// Check if an activity is completed (all levels done)
export const isActivityCompleted = (activityId, totalLevels = 10) => {
  const completedLevels = getCompletedLevels(activityId);
  return completedLevels.length >= totalLevels;
};

