"use client"
import { z } from 'zod';
import { formatFieldId } from '@/lib/utils';
import { FormField, FormType } from '@/types/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormRegister } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';

export default function Form({ form }: { form: FormType; }) {
  
  const { fields, submitButtonText } = form;

  const formSchema = z.object(
    fields.reduce((acc, field) => {
      let validator = z.string();
      if (field.isRequired) validator = validator.min(1, `${field.name} is required`);
      if (field.inputType === 'email') validator = validator.email('Invalid email address');
      return { ...acc, [field.name]: validator };
    }, {})
  );

  type FormValues = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return(
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="mt-10 w-full max-w-xl p-8 space-y-6 border backdrop-blur-sm rounded-3xl"
    >
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          <label htmlFor={formatFieldId(field.name)} className="text-sm font-medium">
            {field.name} {field.isRequired && <span className="text-red-500">*</span>}
          </label>
          <FieldRenderer field={field} register={register} />
          {errors[field.name as keyof typeof errors] && (
            <p className="text-sm text-red-500">
              {errors[field.name as keyof typeof errors]?.message as string}
            </p>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="group w-full flex items-center justify-between gap-2 px-6 py-3 rounded-full text-white bg-blue-700 hover:bg-blue-600 transition-all duration-300"
      >
        <span className='font-medium'>{submitButtonText}</span> <ArrowRight size={16} className='group-hover:translate-x-1 transition-transform duration-300' />
      </button>
    </form>
  )
}

function FieldRenderer({ field, register }: { 
  field: FormField;
  register: UseFormRegister<Record<string, string>>;
}) {
  switch (field.inputType) {
    case 'text':
    case 'email':
    case 'tel':
      return (
        <input
          id={formatFieldId(field.name)}
          {...register(field.name)}
          type={field.inputType}
          placeholder={field.placeholder}
          className="w-full px-4 py-2 border rounded-md"
        />
      );
    case 'textarea':
      return (
        <textarea
          id={formatFieldId(field.name)}
          {...register(field.name)}
          placeholder={field.placeholder}
          rows={4}
          className="w-full px-4 py-2 border rounded-lg"
        />
      );
    default:
      return null;
  }
}