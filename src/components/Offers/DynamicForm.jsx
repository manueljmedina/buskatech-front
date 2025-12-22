import React from 'react';

export default function DynamicForm({ fields, formData, setFormData }) {
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const renderField = (field) => {
    const commonProps = {
      id: field.key,
      name: field.key,
      required: field.required,
      onChange: handleChange,
      value: formData[field.key] || '',
      className: "w-full form-control"
    };

    switch (field.type) {
      case 'textarea':
        return <textarea {...commonProps} rows="3" placeholder={field.label} />;
      
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Seleccione {field.label}</option>
            {field.options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map(opt => (
              <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name={field.key} value={opt} onChange={handleChange} required={field.required} />
                <span className="text-sm text-gray-700">{opt}</span>
              </label>
            ))}
          </div>
        );

      case 'file':
        return <input type="file" {...commonProps} value={undefined} className="form-control-file" />;

      default: // text, number, date, email
        return <input type={field.type} {...commonProps} placeholder={field.label} />;
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      {fields.map((field) => (
        // Usamos el col_size definido en el backend (12, 6, 4, 3)
        <div 
          key={field.key} 
          style={{ gridColumn: `span ${field.col_size || 12} / span ${field.col_size || 12}` }}
          className="col-span-12" // Fallback para móviles
        >
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          {renderField(field)}
        </div>
      ))}
    </div>
  );
}