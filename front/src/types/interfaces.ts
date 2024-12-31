export interface ServerRequestOptions {
  method?: string;
  url: string;
  formData?: Record<string, any> | null;
  withFiles?: boolean;
  arrayBufferResponse?: boolean;
  abortControllerSignal?: AbortSignal | null;
}

export interface ModalProps {
  closeModal: () => void;
  action?: () => void;
  actionTitle?: string;
  title: string; 
  children: React.ReactNode;
}

 export interface FormInputs {
  name: string;
  email: string;
  title: string;
  message: string;
  department:string
}
export interface LoginInputs {
  email: string;
  password: string;
}
export interface SubscribeInputs {
  email: string;

}


export interface MailContent{
  name:string;
  email:string;
  phone:string;
  country:string;
  subject:string;
  message:string;
} 




// Define feature interface
export interface Feature {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
}

// Define project interface
export interface Project {
  id: string;
  color:string;
  img: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
}

// Define the main service interface
export interface Service {
  id: string;
  name_en: string;
  name_ar: string;
  isActive: boolean;
  isComingSoon: boolean;
  description_ar: string;
  description_en: string;
  featuers_img: string;
  featuers ?: Feature[];
  projects ?: Project[];
}
