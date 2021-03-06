import React, { Component } from "react";
import { connect } from "react-redux";
import { BreadCrumbs, Pagination } from "interface/components";
import axios from 'axios'
import Select from 'react-select'
import queryString from 'query-string'
import { fetchToastNotify } from "../../../controller/redux/app-reducer";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import { Other } from 'interface/screens/error'
import { __DEV__, SUPER } from "../../../common/ulti/constants";
import * as CONSTANTS from 'common/ulti/constants';
import * as tbDanhMucUngDung from 'controller/services/tbDanhMucUngDungServices'
import * as cmFunction from 'common/ulti/commonFunction'

class DanhSach extends Component {
  constructor(props) {
    super(props)
    this.state = {
      danhsach: [],

      cbCheckAll: false,

      page: CONSTANTS.DEFAULT_PAGE,
      pagesize: CONSTANTS.DEFAULT_PAGESIZE,
      _size: 0,
      _total_pages: 0,
      filter: null,
      search: {},
      danhsachMaDanhMuc: cmFunction.converDanhSachMaDanhMuc(),
      madanhmucSelected: cmFunction.converDanhSachMaDanhMuc()[0],
      searchToggle: true
    }
  }

  componentDidMount = async () => {

    this._getDanhSachDanhMuc(this._createFilter())
  }

  componentDidUpdate(prevProps) {
    let { location } = this.props
    if (location !== prevProps.location) {
      this._getDanhSachDanhMuc(this._createFilter())
    }
  }

  _createFilter = () => {
    let { madanhmucSelected, search } = this.state
    let parsed = queryString.parse(this.props.location.search);
    let { page, pagesize } = parsed
    let filter = { MaDanhMuc: madanhmucSelected.Ma }
    if (search.Ten) filter['Ten'] = cmFunction.regexText(search.Ten.trim())

    parsed.page = parseInt(page) || CONSTANTS.DEFAULT_PAGE
    parsed.pagesize = parseInt(pagesize) || CONSTANTS.DEFAULT_PAGESIZE
    parsed.count = true
    parsed.sort_by = "STT"
    parsed.filter = JSON.stringify(filter)

    this.state.page = parseInt(page) || CONSTANTS.DEFAULT_PAGE
    this.state.pagesize = parseInt(pagesize) || CONSTANTS.DEFAULT_PAGESIZE
    this.forceUpdate()
    return new URLSearchParams(parsed).toString()
  }

  _getDanhSachDanhMuc = async (query) => {
    let data = await tbDanhMucUngDung.getAll(query)
    this.state.danhsach = data && data._embedded ? data._embedded : [];
    this.state._size = data._size || 0
    this.state._total_pages = data._total_pages || 0
    this.state.cbCheckAll = false
    this.forceUpdate()
  }

  _handleConfirmDelete = (multi, id) => {
    confirmAlert({
      title: 'X??a d??? li???u',
      message: 'B???n mu???n x??a d??? li???u',
      buttons: [
        {
          label: 'Kh??ng',
          onClick: () => { return }
        },
        {
          label: 'C??',
          onClick: () => multi ? this._handleDeleteMulti() : this._handleDeleteOne(id)
        }
      ]
    });
  }

  _handleDeleteMulti = async () => {

    let { danhsach } = this.state, axiosReq = [], count = 0
    danhsach.forEach((item, index) => {
      if (item.checked)
        axiosReq.push(tbDanhMucUngDung.deleteById(item._id.$oid || item._id))
    });

    if (!axiosReq.length) return

    let axiosRes = await axios.all(axiosReq).then(axios.spread((...responses) => {
      return responses
    })).catch(errors => {
      if (__DEV__) console.log(errors)
      this.props.dispatch(fetchToastNotify({ type: CONSTANTS.ERROR, data: 'C?? l???i' }))
    })

    axiosRes.forEach((item, index) => { if (item) count++ });

    this.props.dispatch(fetchToastNotify({ type: CONSTANTS.SUCCESS, data: "X??a th??nh c??ng " + count + " d??? li???u" }))
    this._getDanhSachDanhMuc(this._createFilter())
  }

  _handleLockMulti = async () => {
    let { danhsach } = this.state, axiosReq = [], count = 0
    danhsach.forEach((item, index) => {
      if (item.checked)
        axiosReq.push(tbDanhMucUngDung.lockById(item._id.$oid || item._id))
    });

    if (!axiosReq.length) return

    let axiosRes = await axios.all(axiosReq).then(axios.spread((...responses) => {
      return responses
    })).catch(errors => {
      if (__DEV__) console.log(errors)
      this.props.dispatch(fetchToastNotify({ type: CONSTANTS.ERROR, data: 'C?? l???i' }))
    })

    axiosRes.forEach((item, index) => { if (item) count++ });

    this.props.dispatch(fetchToastNotify({ type: CONSTANTS.SUCCESS, data: "Kh??a th??nh c??ng " + count + " d??? li???u" }))
    this._getDanhSachDanhMuc(this._createFilter())
  }

  _handleDeleteOne = async (id) => {
    let axiosRes = await tbDanhMucUngDung.deleteById(id)
    if (axiosRes) {
      this.props.dispatch(fetchToastNotify({ type: CONSTANTS.SUCCESS, data: "X??a th??nh c??ng" }))
      this._getDanhSachDanhMuc(this._createFilter())
    }
  }

  _handleCheckAll = (evt) => {
    this.state.danhsach.forEach((item, index) => {
      item.checked = evt.target.checked
    });
    this.state.cbCheckAll = evt.target.checked
    this.forceUpdate()
  }

  _handleCheckItem = (evt) => {
    this.state.danhsach.forEach((item, index) => {
      if (item._id.$oid === evt.target.id || item._id === evt.target.id)
        item.checked = evt.target.checked
    });
    this.forceUpdate()
  }

  //
  _handleDanhMucChange = (sel) => {
    this.state.madanhmucSelected = sel
    this.forceUpdate()
    this._handleSearch()
  }

  _handleChangeSearchElement = (evt) => {
    this.state.search[evt.target.id] = evt.target.value
    this.forceUpdate()
  }

  _handleSearch = () => {
    this._getDanhSachDanhMuc(this._createFilter())
  }
  _handleKeyDow = (evt) => {
    if (evt.key === 'Enter') {
      this._handleSearch();
      this.forceUpdate()
    }
  }
  _searchToggle = () => {
    this.state.searchToggle = !this.state.searchToggle
    this.forceUpdate()
  }

  render() {
    let { danhsach, cbCheckAll, danhsachMaDanhMuc, madanhmucSelected, searchToggle } = this.state
    let { page, pagesize, _size, _total_pages, search } = this.state
    let { LoginRes } = this.props
    let checkSuperAdmin = LoginRes.roles === SUPER.roles
    try {
      return (
        <React.Fragment>
          <div className="main portlet fade-in">
            <BreadCrumbs title={"Danh s??ch d??? li???u d??ng chung"} route={[{ label: 'Qu???n l?? d??? li???u d??ng chung', value: '/quan-tri/danh-muc-ung-dung' }]} />
            <div className="portlet-title">
              <div className="caption">
                <i className="fas fa-grip-vertical" />Danh s??ch d??? li???u d??ng chung
              </div>
              <div className="action">
                <button onClick={this._searchToggle} className="btn btn-sm btn-outline-info border-radius pull-right" title="T??m ki???m">
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>

            {searchToggle && <div className="card-body pt-3 pb-3 card-search">
              <div className="form-body">
                <div className="form-row form-group form-custom">
                  <div className="col-md-4">
                    <Select
                      className=""
                      classNamePrefix="form-control"
                      placeholder="Danh m???c"
                      options={danhsachMaDanhMuc}
                      defaultValue={madanhmucSelected}
                      isSearchable={false}
                      onChange={this._handleDanhMucChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <input className="form-control" onChange={this._handleChangeSearchElement} onKeyDown={this._handleKeyDow} value={search.Ten || ''} type="text" id="Ten" placeholder='T??m ki???m' />
                  </div>
                  <div className="col-md-4">
                    <button onClick={this._handleSearch} className="btn btn-outline-primary border-radius ">
                      <i className="fas fa-search" />T??m ki???m
                    </button>
                  </div>
                </div>
              </div>
            </div>}

            <div className="card">
              <div className="card-header">
                <Link to={'/quan-tri/danh-muc-ung-dung/0'} className="btn btn-sm btn-outline-primary border-radius">
                  <i className="fas fa-plus" />Th??m
                </Link>
                <button onClick={() => this._handleConfirmDelete(true, 0)} className="btn btn-sm btn-outline-danger border-radius">
                  <i className="fas fa-trash" />X??a
                </button>
              </div>
              <div className="card-body fix-first">
                <div className="table-fix-head">
                  <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0" ref="dataTable">
                    <thead>
                      <tr>
                        <th className='td-checkbox'><input type="checkbox" id='cbCheckAll' checked={cbCheckAll} onChange={this._handleCheckAll} /></th>
                        <th>STT</th>
                        <th>T??n</th>
                        <th>M?? d??? li???u d??ng chung</th>
                        <th>Tr???ng th??i</th>
                        <th>Ghi ch??</th>
                        {/* {checkSuperAdmin && <th>***</th>} */}
                        <th>H??nh ?????ng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {danhsach.map((item, index) => {
                        return <tr key={index} >
                          <td className='td-checkbox'>
                            <input type="checkbox" checked={item.checked || false} id={item._id.$oid || item._id} onChange={this._handleCheckItem} />
                          </td>
                          <td className='text-center'>{index + 1}</td>
                          <td>{item.Ten}</td>
                          <td>{item.Ma}</td>
                          <td>{item.KichHoat ? 'K??ch ho???t' : ' '}</td>
                          <td>{item.GhiChu}</td>
                          {/* {checkSuperAdmin && <td><span style={{ color: 'red' }}>{item.isActive ? '' : '???? x??a'}</span></td>} */}
                          <td>
                            <Link to={'/quan-tri/danh-muc-ung-dung/' + item._id.$oid || item._id} title="Chi ti???t" className="btn btn-sm btn-outline-info border-radius"><i className="fas fa-pencil-alt" /></Link>
                            <button onClick={() => this._handleConfirmDelete(false, item._id.$oid || item._id)} title="X??a" className="btn btn-sm btn-outline-danger border-radius">
                              <i className="fas fa-trash" />
                            </button>
                          </td>
                        </tr>
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-footer">
                <Pagination history={this.props.history}
                  page={page} pagesize={pagesize}
                  _size={_size} _total_pages={_total_pages}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } catch (e) {
      if (__DEV__) console.log(e)
      return <Other data={e} />
    }
  }
}

const mapStateToProps = state => {
  let { LoginRes, General } = state;
  return { LoginRes, General };
};
export default connect(mapStateToProps)(DanhSach);
