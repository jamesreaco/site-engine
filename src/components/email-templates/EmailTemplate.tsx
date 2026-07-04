import * as React from 'react';

type FormDataType = Record<string, string | number | boolean>;

export function EmailTemplate({ formData }: { 
  formData: FormDataType 
}) {
  return (
    <div>
      <h1>New Form Submission</h1>
      {Object.entries(formData).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {value}
        </div>
      ))}
    </div>
  )
};