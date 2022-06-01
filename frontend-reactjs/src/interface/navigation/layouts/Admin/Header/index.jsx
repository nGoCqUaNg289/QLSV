import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLoginFailure } from "../../../../../controller/redux/login-fetch-reducers";
import { Link } from "react-router-dom";
import * as cmFunction from 'common/ulti/commonFunction'
import { APP_NAME } from "../../../../../../config";

class Header extends Component {
  constructor(props) {
    super(props)
  }

  sidebarToggle = () => {
    document.body.classList.toggle('sb-sidenav-toggled');
  }

  _handleLogout = () => {
    this.props.dispatch(fetchLoginFailure({}))
  }

  render() {
    let { LoginRes } = this.props
    let name = ''
    if (!cmFunction.isEmpty(LoginRes))
      name = this.props.LoginRes.user.name
    return (
      <nav ref='PageHeaderTop' className="sb-topnav navbar navbar-expand navbar-dark bg-dark page-header-top">
        <button onClick={this.sidebarToggle}
          className="btn btn-link btn-sm order-1 order-lg-0"
          id="sidebarToggle">
          <i className="fas fa-bars"></i>
        </button>
        <span className="navbar-brand">{APP_NAME.toUpperCase()}</span>
        <div className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
          {/* <div className="input-group">
            <input className="form-control" type="text" placeholder="Tìm kiếm..." aria-label="Search" aria-describedby="basic-addon2" />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button"><i className="fas fa-search"></i></button>
            </div>
          </div> */}
        </div>
        <ul className="navbar-nav ml-auto ml-md-0">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {name}  <i className="fas fa-user fa-fw"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
              <Link to='/ca-nhan' className="dropdown-item">Cá nhân</Link>
              <Link to='/mat-khau' className="dropdown-item">Đổi mật khẩu</Link>
              <div className="dropdown-divider"></div>
              <button onClick={this._handleLogout} className="dropdown-item">Đăng xuất</button>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  let { LoginRes, General } = state;
  return { LoginRes, General };
};
export default connect(mapStateToProps)(Header);
