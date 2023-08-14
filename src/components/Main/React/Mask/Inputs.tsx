import { Input } from "@chakra-ui/react";
import MaskedInput from "react-text-mask";
import { useState, useRef } from "react"; // Import useState and useRef

export const InputMasked = ({
  mask,
  value,
  name,
  placeholder,
  onChange,
}: any) => {
  const [cursorPosition, setCursorPosition] = useState<number | null>(null); // Add state to store cursor position
  const inputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the input element

  const handleInputChange = (e: any) => {
    const { selectionStart } = e.target;

    // Update cursor position
    setCursorPosition(selectionStart);

    onChange(e);
  };

  const handleInputFocus = () => {
    if (cursorPosition !== null && inputRef.current) {
      inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  };

  return (
    <MaskedInput
      mask={mask}
      onChange={handleInputChange}
      value={value}
      name={name}
      render={(ref, props) => (
        <Input
          {...props}
          variant="flushed"
          placeholder={placeholder}
          _placeholder={{ color: "gray.500" }}
          ref={(inputElement) => {
            if (inputElement) {
              ref(inputElement);
              inputRef.current = inputElement; // Assign the input element to the ref
            }
          }}
          onFocus={handleInputFocus} // Call handleInputFocus when the input is focused
        />
      )}
    />
  );
};
