import api from './axios';
import { AI_ENDPOINTS } from '@/constants/endpoints';

export interface AdGenerationRequest {
  product_ids: number[];
  language?: string;
}

export interface ImageGenerationRequest {
  product_id: number;
  discount?: number;
}

export interface TextGenerationResponse {
  content: string;
}

export interface ImageGenerationResponse {
  image_url: string;
  local_path: string;
}

export const aiService = {
  async generateAdText(request: AdGenerationRequest): Promise<TextGenerationResponse> {
    const { data } = await api.post<TextGenerationResponse>(AI_ENDPOINTS.GENERATE_AD_TEXT, {
      product_ids: request.product_ids,
      language: request.language || 'español'
    });
    return data;
  },

  async generateAdImage(request: ImageGenerationRequest): Promise<ImageGenerationResponse> {
    const { data } = await api.post<ImageGenerationResponse>(AI_ENDPOINTS.GENERATE_AD_IMAGE, {
      product_id: request.product_id,
      discount: request.discount || 20
    });
    return data;
  }
}; 