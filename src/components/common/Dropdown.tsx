import * as React from "react";
import Select, { SelectProps, selectClasses } from "@mui/base/Select";
import Option, { optionClasses } from "@mui/base/Option";
import Popper from "@mui/base/Popper";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "axios";

interface Items {
  id: number;
  name: string;
}

interface Props {
  allCategory?: boolean;
  purpose: "small" | "middle" | "large";
  dropdownSelect: (selectedItem: Items | null) => void;
  selectCategory?: number;
}

export const getCategoryName = (category: number) => {
  const sportsName =
    category == 0
      ? { eng: `soccer`, kr: `축구` }
      : category == 1
      ? { eng: `baseball`, kr: `야구` }
      : category == 2
      ? { eng: `esport`, kr: `e-스포츠` }
      : { eng: `all`, kr: `전체` };
  return sportsName;
};

const Dropdown: React.FC<Props> = ({
  allCategory,
  purpose,
  dropdownSelect,
}) => {
  const [selected, setSelected] = React.useState<any>(allCategory ? 4 : 0);
  const [category, setCategory] = useState<Items[]>([]);

  useEffect(() => {
    dropdownSelect(selected);
  }, [selected]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get("http://localhost:5500/api/v1/category");
        const categoryData = res.data.data;

        if (allCategory) {
          categoryData.unshift({
            id: 4,
            name: "전체",
          });
        }
        const newData = [...categoryData];
        setCategory([...newData]);
      } catch (error) {
        console.error("카테고리 데이터 불러오는거 실패함", error);
      }
    };
    getCategory();
  }, []);

  return (
    <div>
      <CustomSelect
        value={selected}
        onChange={(event, newValue) => setSelected(newValue)}
        // @ts-expect-error
        purpose={purpose}
      >
        {category.map((item, index) => (
          <StyledOption key={index} value={item.id}>
            {item.name}
          </StyledOption>
        ))}
      </CustomSelect>
    </div>
  );
};
const CustomSelect = React.forwardRef(function CustomSelect<
  TValue extends {},
  Multiple extends boolean
>(
  props: SelectProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const slots: SelectProps<TValue, Multiple>["slots"] = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <Select {...props} ref={ref} slots={slots} />;
}) as <TValue extends {}, Multiple extends boolean>(
  props: SelectProps<TValue, Multiple> & React.RefAttributes<HTMLButtonElement>
) => JSX.Element;

export default Dropdown;

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  400: "#8c959f",
  900: "#24292f",
};

const StyledButton = styled("button")<{ purpose?: string }>(
  ({ purpose }) =>
    `
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 18px);
  ${purpose === "small" ? `padding: 5px 12px 2px 12px;` : `padding: 12px;`}
  ${purpose === "small" ? `margin: 10px 10px 0px 10px;` : `padding: 12px;`}
  border-radius: 4px;
  text-align: left;
  line-height: 1.5;
  background:  #fff;
  border: 1px solid #C7C9D9;
  color: ${grey[900]};

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &.${selectClasses.focusVisible} {
    border-color: #5F30E2;
    outline: 3px solid #5F30E2;
  }

  &.${selectClasses.expanded} {
    &::after {
      content: '∨';
      transform: rotate(180deg);
      font-weight:bold;
      font-size: 16px;
      color: #8F90A6;
    }
  }
  &::after {
    content: "∧";
    transform: rotate(180deg);
    font-weight:bold;
    font-size: 16px;
    color: #8F90A6;
    margin: 0px 0px 0px 0px;
    float: right;
  }

  ${
    purpose === "small"
      ? `min-width: 95px;`
      : purpose === "middle"
      ? `min-width: 240px;`
      : `min-width: 304px;`
  }
  ${purpose === "small" ? `height: 0.5px;` : `height: 50px;`}
  `
);

const StyledListbox = styled("ul")<{ purpose?: string }>(
  ({ purpose }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 3px 0;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: #fff;
  border: 1px solid ${grey[200]};
  color: ${grey[900]};
  box-shadow: 0px 4px 30px ${grey[200]};
  ${
    purpose === "small"
      ? `min-width: 105px;`
      : purpose === "middle"
      ? `min-width: 240px;`
      : `min-width: 304px;`
  }
  `
);

const StyledOption = styled(Option)(`
  list-style: none;
  padding: 8px;
  border-radius: 4px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: #EFEAFC;
    color: 28293D;
  }

  &.${optionClasses.highlighted} {
    background-color: ${grey[100]};
    color: ${grey[900]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: #EFEAFC;
    color: 28293D;
  }

  &.${optionClasses.disabled} {
    color: ${grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${grey[100]};
    color: ${grey[900]};
  }
  `);

const StyledPopper = styled(Popper)`
  z-index: 1;
`;
