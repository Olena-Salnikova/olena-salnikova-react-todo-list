function TextInputWithLabel({
  elementId,
  labelText,
  onChange,
  ref,
  value,
}) {
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
}

export default TextInputWithLabel;