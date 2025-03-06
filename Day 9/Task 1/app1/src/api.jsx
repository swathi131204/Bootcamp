// src/services/api.js
export const fetchStudents = async () => {
    try {
      const response = await fetch("/api/students");
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  