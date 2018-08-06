import React from "react";
import { css } from "emotion";
import Downshift from "downshift";

export default props => (
  <Downshift
    onChange={selection => props.setValue(selection.value)}
    itemToString={item => (item ? item.value : "")}
    defaultSelectedItem={props.items[0]}
  >
    {downshift => (
      <div
        className={selectContainerStyle(downshift)}
        onClick={!downshift.isOpen ? downshift.openMenu : null}
      >
        <div
          style={{ width: "100%", textAlign: "left" }}
          {...downshift.getMenuProps()}
        >
          {props.items.map((item, index) => (
            <div
              className={selectItemStyle({
                ...downshift,
                item,
                index,
                itemLength: props.items.length
              })}
              {...downshift.getItemProps({
                key: item.value,
                index,
                item
              })}
            >
              {item.value}
            </div>
          ))}
        </div>
        <Triangle isOpen={downshift.isOpen} />
      </div>
    )}
  </Downshift>
);

const selectContainerStyle = ({ isOpen }) => css`
  display: inline-block;
  min-width: 120px;
  margin: 0 30px 0 5px;
  border-radius: 5px;
  position: relative;
  vertical-align: top;
  height: ${isOpen ? "auto" : "20px"};
`;

const selectItemStyle = ({
  isOpen,
  selectedItem,
  itemLength,
  item,
  index
}) => css`
  width: 100%;
  background: #7b7b7b;
  padding: ${selectedItem !== item && !isOpen ? 0 : "5px 10px"};
  ${handleListBorderRadius({ index, itemLength, isOpen })};
  overflow-y: hidden;
  cursor: pointer;
  height: ${selectedItem !== item && !isOpen ? 0 : "auto"};
`;

const handleListBorderRadius = ({ index, itemLength, isOpen }) => {
  if (index === 0) {
    return css`
      border-radius: ${isOpen ? "5px 5px 0px 0px" : "5px"};
    `;
  }
  if (index === itemLength - 1) {
    return css`
      border-radius: ${isOpen ? "0px 0px 5px 5px" : "5px"};
    `;
  } else
    return css`
      border-radius: ${isOpen ? 0 : "5px"};
    `;
};

const Triangle = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="7"
    viewBox="0 0 14 9"
    style={{
      position: "absolute",
      top: 13,
      right: -13,
      display: isOpen ? "none" : "inline-block"
    }}
  >
    <polygon
      fill="#fff"
      points="175 13 182 22 168 22"
      transform="matrix(1 0 0 -1 -168 22)"
    />
  </svg>
);
