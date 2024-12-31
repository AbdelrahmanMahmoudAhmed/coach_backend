import React from 'react';
import { useTranslations } from 'next-intl';

interface ValidationRule {
  required?: {
    value: boolean;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
  validate?: (value: string) => boolean | string;
}

interface Validations {
  required: ValidationRule;
  name: ValidationRule;
  email: ValidationRule;
  password: ValidationRule;
  phone: ValidationRule;
  country: ValidationRule;
  message: ValidationRule;
  [key: string]: ValidationRule;
}

export interface WithValidationsProps {
  validations: Validations;
}

function withValidations<T extends WithValidationsProps>(
  WrappedComponent: React.ComponentType<T>
) {
  return function ComponentWithValidations(props: Omit<T, keyof WithValidationsProps>) {
    const t = useTranslations();
    
    const validations: Validations = {
      required: {
        required: {
          value: true,
          message: 'required'
        },
      },
      name: {
        required: {
          value: true,
          message: 'required',
        },
        minLength: {
          value: 2,
          message: `min`,
        },
      },
      password: {
        required: {
          value: true,
          message: 'required',
        },
        minLength: {
          value: 6,
          message: `min_pass`,
        },
      },
      department: {
        required: {
          value: true,
          message: 'required',
        },
        
      },
      email: {
        required: {
          value: true,
          message: 'required'
        },
        pattern: {
          value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          message: 'email'
        },
      },
      phone: {
        required: {
          value: true,
          message: 'required'
        },
        pattern: {
          value: /^\d{11,}$/,
          message: 'website_phone'
        },
      },
      country: {
        required: {
          value: true,
          message: 'country'
        },
        validate: (country: string) => {
          if (!country || country === 'def') {
            return 'country';
          }
          return true;
        },
      },
      message: {
        required: {
          value: true,
          message: 'required'
        },
        minLength: {
          value: 10,
          message: 'min_msg',
        },
      },
    };

    return <WrappedComponent {...(props as T)} validations={validations} />;
  };
}

export default withValidations;
