import React from "react";
import { css } from "emotion";
import Downshift from "downshift";

export default class Select extends React.Component {
  state = { value: null };

  render = () => (
    <Downshift
      onChange={selection => this.props.setValue(selection)}
      itemToString={item => (item ? item.value : "")}
      defaultSelectedItem={this.props.items[0]}
    >
      {downshift => (
        <div
          className={css`
            display: inline-block;
            min-width: 120px;
            margin: 0 30px 0 5px;
            border-radius: 5px;
            position: relative;
            vertical-align: top;
            height: ${downshift.isOpen ? "auto" : "20px"};
          `}
          onClick={!downshift.isOpen ? downshift.openMenu : null}
        >
          <div
            className={css`
              width: 100%;
            `}
            {...downshift.getMenuProps()}
          >
            {this.props.items.map((item, index) => (
              <div
                className={css`
                  width: 100%;
                  background: #7b7b7b;
                  padding: ${downshift.selectedItem !== item &&
                  !downshift.isOpen
                    ? 0
                    : "5px 10px"};
                  border-radius: 5px;
                  overflow-y: hidden;
                  cursor: pointer;
                  height: ${downshift.selectedItem !== item && !downshift.isOpen
                    ? 0
                    : "auto"};
                `}
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
        </div>
      )}
    </Downshift>
  );
}
