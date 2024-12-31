import { withAxios } from './clientRequest';

export default {
  
  getAllFeedbacks: (prams:string | null) => {
    return withAxios({ url: `/panel/website-management/feedback${prams}`, method: 'GET' , auth:true });
  },
  deleteFeedback : (id:string | number) => {
    return withAxios({ url: `/panel/website-management/feedback/${id}`, method: 'DELETE' , auth:true });
  },
  login: (payload = {}) => {
    return withAxios({ url: `/panel/auth`, method: 'POST', formData: payload });
  }
};
