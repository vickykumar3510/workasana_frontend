import { useEffect, useRef, useState } from "react";

const MultiSelectDropdown = ({
  id,
  placeholder = "Select options",
  options = [],
  selected = [],
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
      return;
    }

    onChange([...selected, value]);
  };

  const getDisplayText = () => {
    if (selected.length === 0) return placeholder;

    const labels = selected
      .map((value) => options.find((option) => option.value === value)?.label)
      .filter(Boolean);

    if (labels.length === 0) return placeholder;
    if (labels.length <= 2) return labels.join(", ");
    return `${labels.length} selected`;
  };

  return (
    <div
      ref={rootRef}
      className={`multi-select ${isOpen ? "multi-select--open" : ""}`}
    >
      <button
        type="button"
        id={id}
        className="multi-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span
          className={
            selected.length === 0 ? "multi-select-placeholder" : undefined
          }
        >
          {getDisplayText()}
        </span>
        <span className="multi-select-chevron" aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          className="multi-select-menu"
          role="listbox"
          aria-multiselectable="true"
          aria-labelledby={id}
        >
          {options.length === 0 ? (
            <p className="multi-select-empty">No options available</p>
          ) : (
            options.map((option) => (
              <label key={option.value} className="multi-select-option">
                <input
                  type="checkbox"
                  checked={selected.includes(option.value)}
                  onChange={() => toggleOption(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))
          )}
        </div>
      )}

      {selected.length > 0 && (
        <div className="multi-select-chips">
          {selected.map((value) => {
            const label = options.find((option) => option.value === value)?.label;
            if (!label) return null;

            return (
              <span key={value} className="multi-select-chip">
                {label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
