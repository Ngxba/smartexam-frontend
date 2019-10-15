import React from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class PesonalBar extends React.Component {
  render() {
    return (
      <ButtonDropdown isOpen={this.props.visible} toggle={this.props.onToggle}>
        <DropdownToggle outline caret style={{border : "none"}}>
          <i className="far fa-user fa-5x"></i>
          {/* <i class="fas fa-bars fa-3x"></i> */}
          {/* <i className="fas fa-user-cog"></i> */}
        </DropdownToggle>
        <DropdownMenu className="" >
          <DropdownItem header>{this.props.userInfo.userEmail}</DropdownItem>
          <DropdownItem disabled>{this.props.userInfo.userName}</DropdownItem>
          <DropdownItem divider />
          {this.props.userRoll === "Teacher" && (
            <DropdownItem onClick={this.props.createClass}>
              Create new class
            </DropdownItem>
          )}
          <DropdownItem onClick={this.props.seeOwnedClass}>
            See my class
          </DropdownItem>
          {this.props.userRoll === "Teacher" && (
            <>
              <DropdownItem divider />
              <DropdownItem onClick={this.props.seeAllQuest}>
                See all quest
              </DropdownItem>
              <DropdownItem onClick={this.props.addQuestion}>
                Add question
              </DropdownItem>
            </>
          )}

          <DropdownItem divider />
          <DropdownItem onClick={this.props.seeMyProfile}>
            See my profile
          </DropdownItem>
          <DropdownItem onClick={this.props.logOut}>Log out</DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

export default PesonalBar;
