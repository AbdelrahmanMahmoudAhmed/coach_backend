import React from "react";
import Select, { StylesConfig, GroupBase, SingleValue, MultiValue, ActionMeta } from "react-select";
import { Option } from "@/types/types";
import { useTheme } from '@/hooks/useThemeHook';



// Props for the SelectInput component
interface SelectInputProps {
  options: Option[]; 
  isMulti?: boolean; 
  placeholder?: string; 
  // customStyles?: StylesConfig<Option, boolean, GroupBase<Option>>; 
  onChange?: (
    newValue: SingleValue<Option> | MultiValue<Option>,
    actionMeta: ActionMeta<Option>
  ) => void; 
}





const SelectInput: React.FC<SelectInputProps> = ({
  options,
  isMulti = false,
  placeholder = "Select...",
  // customStyles,
  onChange,
}) => {


  const theme = useTheme();

  // Custom Styles
const customStyles = {

  control: (base: any, state: any) => ({
    ...base,
    width: "100%",
    appearance: "none",
    borderRadius: "8px",
    borderColor: state.isFocused ? "#FF6B00" : theme == 'dark' ? "#565656"  :"#DDDDDD !important", 
    backgroundColor: "transparent",
    height: "56px",
    padding: "0 12px",
    fontSize: "18px",
    outline: "none",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(255, 107, 0, 0.5)" : "none",
    "&:hover": {
      borderColor: "#FF6B00",
    },
    "&:focus": {
      borderColor: "#FF6B00",
    },
  }),
  input: (base: any) => ({
    ...base,
    color: "#fff !important", // Ensures the text color is black
  }),


  menu: (base: any) => ({
    ...base,
    backgroundColor: theme == 'dark' ? "#131313" : "#fff", 
    borderRadius: "8px", 
    border: "1px solid #ddd", 
    marginTop: "4px", 
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", 
    zIndex: 9999, 
    borderColor:  theme == 'dark' ? "#565656"  :"#DDDDDD !important", 
  }),

  // Dropdown list items
  // menuList: (base: any) => ({
    // ...base,
    // backgroundColor:theme == 'dark' ? "#131313" : "#fff",
    // borderRadius: "8px",
    // padding: "0", 
    // maxHeight: "200px", 
    // overflowY: "auto", 
    // borderColor:  theme == 'dark' ? "#565656"  :"#DDDDDD !important", 

  // }),

  option: (base: any, state: any) => ({
    ...base,
    padding: "10px 15px",
    cursor: "pointer",
    backgroundColor: (state.isFocused ||  state.isSelected )? "#FF6B00" :  theme == 'dark' ? "#131313" : "#fff", 
    borderRadius: "8px",
    color: (state.isFocused ||state.isSelected ||  theme == 'dark' ) ? "#fff" : "#000", // Text color
  }),

  singleValue: (base: any)=> ({
    ...base,
    color:  theme == 'dark' ? "#fff" : "#000",
  })
  
  // multiValue: (base: any) => ({
  //   ...base,
  //   backgroundColor: "#FF6B00", 
  // }),
  // multiValueLabel: (base: any) => ({
  //   ...base,
  //   color: "#333",
  // }),
  // multiValueRemove: (base: any) => ({
  //   ...base,
  //   color: "#999",
  //   "&:hover": { color: "red" }, 
  // }),
};


  return (
    <>
    <Select
    
      options={options}
      isMulti={isMulti}
      styles={customStyles}
      placeholder={placeholder}
      onChange={onChange} 
    />
    </>
  );
};

export default SelectInput;
