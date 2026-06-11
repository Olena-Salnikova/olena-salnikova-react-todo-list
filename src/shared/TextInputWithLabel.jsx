import { forwardRef } from 'react';

const TextInputWithLabel = forwardRef(({
  elementId,
  labelText,
  onChange,
  value,
}, ref) => {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>
      <input
        id={elementId}
        type="text"
        onChange={onChange}
        ref={ref}
        value={value}
      />
    </>
  );
});

TextInputWithLabel.displayName = 'TextInputWithLabel';

export default TextInputWithLabel;