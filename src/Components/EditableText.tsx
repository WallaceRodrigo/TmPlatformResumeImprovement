import React, { useState, useEffect, useRef } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  isTextarea?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({ value, onChange, isTextarea = false }) => {
  const [editableValue, setEditableValue] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setEditableValue(value);
    if (textareaRef.current) {
      adjustTextareaHeight(textareaRef.current);
    }
  }, [value]);

  const handleBlur = () => {
    onChange(editableValue);
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableValue(e.target.value);
    adjustTextareaHeight(e.target);
  };

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    isTextarea ? (
      <textarea
        ref={textareaRef}
        value={editableValue}
        onChange={handleInput}
        onBlur={handleBlur}
      />
    ) : (
      <input
        type="text"
        value={editableValue}
        onChange={(e) => setEditableValue(e.target.value)}
        onBlur={handleBlur}
      />
    )
  );
};

export default EditableText;
