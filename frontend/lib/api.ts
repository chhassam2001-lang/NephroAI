import axios from 'axios';

// Route all Axios requests through the Next.js proxy to magically bypass CORS!
const API_BASE_URL = '/api/proxy';

// Ensure ngrok bypasses browser warnings using headers
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': '69420',
  },
  timeout: 30000, // 30 second timeout for heavy image processing
});

export interface ImagePredictionResponse {
  predicted_class: 'Stone' | 'Normal';
  confidence: number;
  stone_probability: number;
  yolo_triggered: boolean;
  detections_count: number;
  annotated_image?: string; // Now correctly treated as a URL string
}

export interface LabPredictionResponse {
  predicted_class: 'Stone' | 'Normal';
  confidence: number;
  stone_probability: number;
}

export interface LabDataInput {
  Age: number;
  Creatinine: number;
  Calcium: number;
  Uric_Acid: number;
  pH: number;
}

// Custom Error Formatter
const formatError = (error: unknown, fallbackMessage: string): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with a status other than 2xx
      return error.response.data?.error || `Server Error: ${error.response.status}`;
    } else if (error.request) {
      // Request was made but no response received (Network error, CORS, or Backend offline)
      return 'Network error: Unable to reach the backend. Please check if the server is running.';
    }
  }
  return error instanceof Error ? error.message : fallbackMessage;
};

/**
 * Endpoint 1: Health Check
 */
export const checkApiHealth = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    console.error('[API Error] Health check failed:', error);
    throw new Error(formatError(error, 'Failed to connect to the backend API.'));
  }
};

/**
 * Endpoint 2: Predict from CT Scan Image
 */
export const predictImage = async (file: File): Promise<ImagePredictionResponse> => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axiosInstance.post<ImagePredictionResponse>('/predict', formData);
    
    // Safely handle the annotated image URL
    if (response.data.annotated_image) {
      const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const cleanApiUrl = rawApiUrl.endsWith('/') ? rawApiUrl.slice(0, -1) : rawApiUrl;
      
      if (cleanApiUrl && response.data.annotated_image.includes(cleanApiUrl)) {
        response.data.annotated_image = response.data.annotated_image.replace(
          cleanApiUrl,
          '/api/proxy'
        );
      } else if (response.data.annotated_image.startsWith('/')) {
        response.data.annotated_image = `/api/proxy${response.data.annotated_image}`;
      }

      if (response.data.annotated_image.startsWith('http://') && !response.data.annotated_image.includes('localhost')) {
        response.data.annotated_image = response.data.annotated_image.replace('http://', 'https://');
      }
    }
    
    return response.data;
  } catch (error) {
    console.error('[API Error] Image prediction failed:', error);
    throw new Error(formatError(error, 'Image analysis failed. Please try again.'));
  }
};

/**
 * Endpoint 3: Predict from Lab Data
 */
export const predictLabData = async (data: LabDataInput): Promise<LabPredictionResponse> => {
  try {
    const response = await axiosInstance.post<LabPredictionResponse>('/predict-lab', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('[API Error] Lab prediction failed:', error);
    throw new Error(formatError(error, 'Lab data analysis failed. Please verify inputs.'));
  }
};
