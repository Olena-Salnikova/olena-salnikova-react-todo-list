import { forwardRef } from 'react';
import styles from './TextInputWithLabel.module.css';

const TextInputWithLabel = forwardRef(({
  elementId,
  labelText,
  onChange,
  value,
  type = "text",
  ...props
}, ref) => {
  return (
    <div className={styles.fieldGroup}>
      <label htmlFor={elementId} className={styles.label}>
        {labelText}
      </label>
      
      <input
        id={elementId}
        type={type}
        className={styles.input}
        onChange={onChange}
        ref={ref}
        value={value}
        {...props}
      />
    </div>
  );
});

TextInputWithLabel.displayName = 'TextInputWithLabel';

export default TextInputWithLabel;