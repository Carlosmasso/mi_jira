const Select = ({ options, value, onChange, defaultValue, ...rest }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} {...rest}>
      {defaultValue && <option value="">{defaultValue}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.icon} {opt.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
