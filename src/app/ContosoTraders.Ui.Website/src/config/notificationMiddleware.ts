import { isAxiosError } from 'axios';
import toast from '../helpers/toast';


const notification = () => (next:any) => (action:any) => {
  const { error } = action;

  if (isAxiosError(error) && error.response) {
    const response = error.response;
    if (response.status !== 201 && response.status !== 200) {
      toast.error(JSON.stringify(response.statusText), "Error");
    }
  }

  return next(action);
};

export default notification;