import api from './api';
import { Contribution } from '../models/index';

// Fetch contributions from API
export const getContributions = async (): Promise<Contribution[]> => {
  try {
    const response = await api.get('/contributions');
    return response.data;
  } catch (error) {
    console.error("Failed to fetch contributions:", error);
    return [];
  }
};

// Add a new contribution
export const addContribution = async (contribution: Contribution) => {
  try {
    const response = await api.post('/contributions', contribution);
    return response.data;
  } catch (error) {
    console.error("Failed to add contribution:", error);
    throw error;
  }
};

// Update contribution status
export const updateContributionStatus = async (id: string, status: Contribution['status']) => {
  try {
    const response = await api.patch(`/contributions/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error("Failed to update status:", error);
    throw error;
  }
};
