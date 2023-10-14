import { theme } from "@/app/styles/global";
import { Box, Input, ListItem, UnorderedList } from "@chakra-ui/react";
import { useCombobox } from "downshift"
import { useState } from "react";

interface DropDownComboboxProps {
  initialState: string[],
  options: Options,
  // selectedItem: string;
  // onChange: (value: string) => void;
}

export function DropdownCombobox({ initialState, options, onChange, selectedItem }: DropDownComboboxProps) {

  function getItemsFilter(inputValue: string) {
    const lowerCasedInputValue = inputValue.toLowerCase()

    return function itemsFilter(item: string) {
      return (
        !inputValue ||
        item.toLowerCase().includes(lowerCasedInputValue) ||
        item.toLowerCase().includes(lowerCasedInputValue)
      )
    }
  }

  function ComboBox({ initialState, options, onChange, selectedItem }: DropDownComboboxProps) {
    const [items, setItems] = useState(initialState)

    const {
      isOpen,
      getToggleButtonProps,
      getMenuProps,
      getInputProps,
      highlightedIndex,
      getItemProps,
    } = useCombobox({
      onInputValueChange({ inputValue }) {
        if (typeof inputValue === "string") {
          setItems(initialState.filter(getItemsFilter(inputValue)))
        } else {
          throw new Error('Custom Error: Combobox onInputValueChange else statement')
        }
      },
      items,
      selectedItem,
      onSelectedItemChange: ({ selectedItem }) => {
        onChange(selectedItem || '');
      },
      itemToString: (item) => item || '',
    })
    return (
      <Box>
        <Box>
          <Box display={"flex"} alignContent={"center"} gap={"8px"}>
            <Input
              height={"32px"}
              type={"search"}
              color={"white"}
              border={"none"}
              placeholder={"Город, район, улица, м... "}
              // onChange={onInput}
              bgColor={theme.colors.grey.vtb_hardgrey}
              {...getInputProps()}
            />
            <button
              aria-label="toggle menu"
              type="button"
              {...getToggleButtonProps()}
            >
            </button>
          </Box>
        </Box>
        <UnorderedList maxHeight={'60px'} overflow={'auto'} spacing={1} sx={{
          scrollbarWidth: "thin",
          scrollbarColor: "gray.300 transparent",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "gray.300",
            borderRadius: "3px",
          },
        }} {...getMenuProps()}>
          {isOpen &&
            items.map((item, index) => (
              <ListItem listStyleType={"none"}
                cursor={'pointer'}
                style={
                  highlightedIndex === index ? { backgroundColor: `${theme.colors.grey.vtb_hardgrey}` } : {}
                }
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
              >
                <span>{item}</span>
              </ListItem>
            ))}
        </UnorderedList>
      </Box>
    )
  }
  return <ComboBox initialState={initialState} options={options} onChange={onChange} selectedItem={selectedItem} />
}