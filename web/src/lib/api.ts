/**
 * API functions for communicating with the FastAPI backend
 */

export interface GenerateStoryRequest {
  images: File[];
  text: string | null;
}

export interface GenerateStoryResponse {
  sessionId: string;
  story: string;
}

/**
 * Send images and optional text to the backend to generate a story
 * @param images Array of image files (max 5)
 * @param text Optional context text
 * @returns Promise with sessionId and generated story
 */
export async function generateStory(
  images: File[],
  text: string | null
): Promise<GenerateStoryResponse> {
  // Create FormData to send files
  const formData = new FormData();
  
  // Append each image
  images.forEach((image, index) => {
    formData.append('images', image, image.name);
  });
  
  // Append text if provided
  if (text) {
    formData.append('text', text);
  }

  try {
    // TODO: Replace with actual backend URL
    const response = await fetch('/api/generate-story', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating story:', error);
    throw error;
  }
}
