import axios from 'utils/axios';

import { Topic, TopicsFilter } from 'types/e-commerce';

// ⬇️ this is the loader for the detail route
export async function loader() {
  try {
    const response = await axios.get('api/v1/solicitation/solicitation-topics');
    return response.data.products as Topic[];
  } catch (error) {
    return error;
  }
}

export async function filterOpenTopics(filter: TopicsFilter) {
  return await axios.get('/api/v1/solicitation/solicitation-topics');
  // return await axios.get('/api/v1/solicitation/solicitation-topics', { filter });
}

export async function openTopicsLoader({ params }: any) {
  try {
    const response = await axios.post('/api/product/details', { id: params.id });
    return response.data as Topic;
  } catch (error) {
    return error;
  }
}

// export async function getRelatedProducts(id: string | undefined) {
//   return await axios.post('/api/product/related', { id });
// }

// export async function getProductReviews() {
//   return await axios.get('/api/review/list');
// }
