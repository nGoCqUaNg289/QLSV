import React, { Component } from "react";
import { connect } from "react-redux";
import { BreadCrumbs, Search, Pagination } from "interface/components";
import axios from 'axios'
import Modal from 'react-modal';
import Select from 'react-select'
import queryString from 'query-string'
import XLSX from 'xlsx';
import ReactDOM from 'react-dom';
import moment from 'moment'
import { fetchToastNotify } from "../../../controller/redux/app-reducer";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import { Other } from 'interface/screens/error'
import { __DEV__ } from "../../../common/ulti/constants";
import * as CONSTANTS from 'common/ulti/constants';
import * as tbLogApi from 'controller/services/tbLogApiServices'
import * as cmFunction from 'common/ulti/commonFunction'
import * as Excel from "exceljs";
import { saveAs } from 'file-saver';

class DanhSach extends Component {
  constructor(props) {
    super(props)
    this.state = {
      danhsach: [],
      form: {},
      batdau: null,
      ketthuc: null,
      cbCheckAll: false,
      searchIsOpen: false,
      page: CONSTANTS.DEFAULT_PAGE,
      pagesize: CONSTANTS.DEFAULT_PAGESIZE,
      _size: 0,
      _total_pages: 0,
      filter: null,
      search: {},
      searchToggle: false
    }
  }

  componentDidMount = async () => {
    this._getDanhSachLogApi(this._createFilterSearch())
  }

  componentDidUpdate(prevProps) {
    let { location } = this.props
    if (location !== prevProps.location) {
      this._getDanhSachLogApi(this._createFilterSearch())
    }
  }

  _createFilter = () => {
    let parsed = queryString.parse(this.props.location.search);
    let { page, pagesize, filter } = parsed
    filter = filter ? cmFunction.decode(filter) : filter
    parsed.page = parseInt(page) || CONSTANTS.DEFAULT_PAGE
    parsed.pagesize = parseInt(pagesize) || CONSTANTS.DEFAULT_PAGESIZE
    parsed.count = true
    !filter ? delete parsed.filter : parsed.filter = filter
    this.state.page = parseInt(page) || CONSTANTS.DEFAULT_PAGE
    this.state.pagesize = parseInt(pagesize) || CONSTANTS.DEFAULT_PAGESIZE
    this.state.filter = filter
    this.forceUpdate()
    return new URLSearchParams(parsed).toString()
  }

  _getDanhSachLogApi = async (query) => {
    let data = await tbLogApi.getAll(query)
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
    let { LoginRes } = this.props
    let { danhsach } = this.state, axiosReq = [], count = 0
    danhsach.forEach((item, index) => {
      if (item.checked && LoginRes._id !== (item._id.$oid || item._id))
        axiosReq.push(tbLogApi.deleteById(item._id.$oid || item._id))
      else this.props.dispatch(fetchToastNotify({ type: CONSTANTS.WARNING, data: "Kh??ng th??? x??a t??i kho???n c???a b???n" }))
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
    this._getDanhSachLogApi(this._createFilter())
  }

  _handleLockMulti = async () => {
    let { danhsach } = this.state, axiosReq = [], count = 0
    danhsach.forEach((item, index) => {
      if (item.checked)
        axiosReq.push(tbLogApi.lockById(item._id.$oid || item._id))
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
    this._getDanhSachLogApi(this._createFilter())
  }

  _handleDeleteOne = async (id) => {
    let { LoginRes } = this.props
    if (LoginRes._id === id) {
      this.props.dispatch(fetchToastNotify({ type: CONSTANTS.WARNING, data: "Kh??ng th??? x??a t??i kho???n c???a b???n" }))
      return
    }
    let axiosRes = await tbLogApi.deleteById(id)
    if (axiosRes) {
      this.props.dispatch(fetchToastNotify({ type: CONSTANTS.SUCCESS, data: "X??a th??nh c??ng" }))
      this._getDanhSachLogApi(this._createFilter())
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

  // EXPORT EXCEL
  // _handleExportExcel = (ref) => {

  //   // v?? d??? xu???t excel t???i b???ng ??ang c??
  //   let myRows = [['Danh s??ch L???ch S???']], maxCol = 0
  //   let table = ReactDOM.findDOMNode(this.refs[`${ref}`]);
  //   let filter = this.state.filter
  //   for (let tbindex = 0; tbindex < table.children.length; tbindex++) {
  //     let tb = table.children[`${tbindex}`]
  //     for (let trindex = 0; trindex < tb.children.length; trindex++) {
  //       let row = []
  //       let tr = tb.children[`${trindex}`]
  //       maxCol = tr.children.length > maxCol ? tr.children.length : maxCol
  //       for (let thindex = 0; thindex < tr.children.length; thindex++) {
  //         let th = tr.children[`${thindex}`]
  //         row.push(th.innerText)
  //       }
  //       myRows.push(row)
  //     }
  //   }
  //   // set colspan v?? rowspan
  //   let merge = [
  //     // { s: { r: 0, c: 0 }, e: { r: 0, c: maxCol } },
  //     // { s: { r: 1, c: 6 }, e: { r: 1, c: 7 } }
  //   ]
  //   // xu???t file
  //   let ws = XLSX.utils.aoa_to_sheet(myRows);
  //   ws["!merges"] = merge;
  //   let wb = XLSX.utils.book_new();
  //   //add th??m nhi???u Sheet v??o ????y c??ng ??c
  //   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  //   let date = cmFunction.timestamp2DateString(moment().valueOf())
  //   let name = 'DSLichSu_' + this.state.page + '_' + date
  //   XLSX.writeFile(wb, name + ".xlsx")
  // }
  _handleExportExcel = (ref) => {
    // v?? d??? xu???t excel t???i b???ng ??ang c??
    let myRows = [], maxCol = 0
    let table = ReactDOM.findDOMNode(this.refs[`${ref}`]);
    for (let tbindex = 0; tbindex < table.children.length; tbindex++) {
      let tb = table.children[`${tbindex}`]
      for (let trindex = 0; trindex < tb.children.length; trindex++) {
        let row = []
        let tr = tb.children[`${trindex}`]
        maxCol = tr.children.length > maxCol ? tr.children.length : maxCol
        for (let thindex = 0; thindex < tr.children.length - 1; thindex++) {
          let th = tr.children[`${thindex}`]
          row.push(th.innerText)
        }
        myRows.push(row)
      }
    }
    let date = cmFunction.timestamp2DateString(moment().valueOf())
    let name = 'DSLichSu_' + this.state.page + '_' + date
    const wb = new Excel.Workbook()
    const ws = wb.addWorksheet('DSLichSu')
    ws.addRows(myRows)
    ws.getRow(1).font = { name: 'Times New Roman', family: 2, size: 10, bold: true };
    for (let i = 0; i < myRows[1].length; i++) {
      ws.getCell(String.fromCharCode(65 + i) + 1).alignment = { vertical: 'top', horizontal: 'center' };
    }
    for (let i = 0; i < myRows.length; i++) {
      for (let j = 0; j < myRows[1].length; j++) {
        ws.getCell(String.fromCharCode(65 + j) + (i + 1)).border = {
          top: { style: 'thin', color: { argb: '00000000' } },
          left: { style: 'thin', color: { argb: '00000000' } },
          bottom: { style: 'thin', color: { argb: '00000000' } },
          right: { style: 'thin', color: { argb: '00000000' } }
        }
      }
    }
    wb.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
      saveAs(blob, name + ".xlsx")
    })
  }


  _handleChangeSearchElement = (evt) => {
    this.state.search[evt.target.id] = evt.target.value
    this.forceUpdate()
  }

  _handleKeyDow = (evt) => {
    if (evt.key === 'Enter') {
      this._handleSearch();
      this.forceUpdate()
    }
  }

  _handleSearch = () => {
    this._getDanhSachLogApi(this._createFilterSearch())
  }

  _createFilterSearch = () => {
    let { search, batdau, ketthuc } = this.state
    let parsed = queryString.parse(this.props.location.search);
    let { page, pagesize } = parsed
    let batdauTimeStamp = this._handleConverDateToTimeStamp(batdau)
    let ketthucTimeStamp = this._handleConverDateToTimeStamp(ketthuc)
    let filter = {}
    
    // parsed.sort_by = "STT"
    if (search.Ten || batdauTimeStamp || ketthucTimeStamp) {
      if (search.Ten) {
        // filter['Ten'] = cmFunction.regexText(search.Ten.trim())
        filter['$or'] = [
          { 'user.account': cmFunction.regexText(search.Ten.trim()) },
          { 'request.method': cmFunction.regexText(search.Ten.trim()) },
          { 'request.originalUrl': cmFunction.regexText(search.Ten.trim()) }
        ]
      }
      if (batdauTimeStamp && ketthucTimeStamp) {
        filter['$and'] = [
          { "request.timestamp": { $gte: batdauTimeStamp } },
          { "request.timestamp": { $lte: ketthucTimeStamp } }]
      }
      else if (batdauTimeStamp && !ketthucTimeStamp) {
        filter["request.timestamp"] = { $gte: batdauTimeStamp }
      }
      else if (!batdauTimeStamp && ketthucTimeStamp) {
        filter["request.timestamp"] = { $lte: ketthucTimeStamp }
      }
      parsed.filter = JSON.stringify(filter)
    }
    parsed.page = parseInt(page) || CONSTANTS.DEFAULT_PAGE
    parsed.pagesize = parseInt(pagesize) || CONSTANTS.DEFAULT_PAGESIZE
    parsed.count = true
    this.state.page = parseInt(page) || CONSTANTS.DEFAULT_PAGE
    this.state.pagesize = parseInt(pagesize) || CONSTANTS.DEFAULT_PAGESIZE
    this.forceUpdate()
    return new URLSearchParams(parsed).toString()
  }

  _searchToggle = () => {
    this.state.searchToggle = !this.state.searchToggle
    this.forceUpdate()
  }

  _convertUrl = (string) => {
    if (string.length > 49)
      return string.slice(0, 50) + '...';
    return string
  }
  _handleConverDateToTimeStamp = (dateToConvert) => {
    let date = new Date(dateToConvert)
    return date.getTime()
  }
  _handleChangeElement = (evt) => {
    if (evt.target.id == "batdau") {
      this.state.batdau = evt.target.value
    }
    if (evt.target.id == "ketthuc") {
      this.state.ketthuc = evt.target.value
    }
    this.forceUpdate()
  }
  render() {
    let { danhsach, cbCheckAll, search, searchToggle } = this.state
    let { page, pagesize, _size, _total_pages } = this.state
    try {
      return (
        <React.Fragment>
          <div className="main portlet fade-in">
            <BreadCrumbs title={"Danh s??ch l???ch s???"} route={[{ label: 'Qu???n l?? l???ch s???', value: '/quan-tri/log-api' }]} />
            <div className="portlet-title">
              <div className="caption">
                <i className="fas fa-grip-vertical" />L???ch s??? thao t??c h??? th???ng
              </div>
              <div className="action">
                <button onClick={() => this._handleExportExcel('dataTable')} className="btn btn-sm btn-outline-info border-radius" title="Xu???t excel">
                  <i className="fas fa-download" />
                </button>
                <button onClick={this._searchToggle} className="btn btn-sm btn-outline-info border-radius pull-right" title="T??m ki???m">
                  <i className="fas fa-search" />
                </button>
              </div>
            </div>
            {searchToggle && <div className="card-body pt-3 pb-3 card-search">
              <div className="form-body">
                <div className="form-row form-group form-custom">
                  <div className="col-md-10">
                    <input className="form-control" onChange={this._handleChangeSearchElement} onKeyDown={this._handleKeyDow}
                      value={search.Ten || ''} type="text" id="Ten" placeholder='T??m ki???m t??i kho???n, h??nh ?????ng, ?????i  t?????ng' />
                  </div>
                  <div className="col-md-2">
                    <button onClick={this._handleSearch} className="btn btn-outline-primary border-radius ">
                      <i className="fas fa-search" />T??m ki???m
                    </button>
                  </div>
                </div>
                <div className="form-row form-group form-custom">
                  <div className="col-md-2" style={{ textAlign: "left" }}>
                    <label htmlFor="ketthuc" style={{ paddingLeft: "10px", paddingTop: "8px" }}>
                      Th???i gian b???t ?????u
                    </label>
                  </div>
                  <div className="col-md-3">
                    <input className="form-control"
                      onChange={this._handleChangeElement}
                      type="date"
                      id="batdau"
                    />
                  </div>
                  <div className="col-md-2" style={{ textAlign: "left" }}>
                    <label htmlFor="ketthuc" style={{ paddingLeft: "10px", paddingTop: "8px" }}>
                      Th???i gian k???t th??c
                    </label>
                  </div>
                  <div className="col-md-3">
                    <input className="form-control"
                      onChange={this._handleChangeElement}
                      type="date"
                      id="ketthuc"
                    />
                  </div>
                  <div className="col-md-2">

                  </div>
                </div>
              </div>
            </div>}
            <div className="card">
              <div className="card-header">

              </div>
              <div className="card-body fix-first" style={{ padding: 0 }}>
                <div className="table-fix-head">
                  <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0" ref="dataTable">
                    <thead>
                      <tr>
                        {/* <th className='td-checkbox'><input type="checkbox" id='cbCheckAll' checked={cbCheckAll} onChange={this._handleCheckAll} /></th> */}
                        <th>STT</th>
                        <th>Th???i gian</th>
                        <th>T??i kho???n</th>
                        <th>H??nh ?????ng</th>
                        <th>IP</th>
                        <th>?????i t?????ng</th>
                        {/* <th>Email</th>
                        <th>????n v???</th>
                        <th>Tr???ng th??i</th> */}
                        <th>H??nh ?????ng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {danhsach.map((item, index) => {
                        return <tr key={index} >
                          {/* <td className='td-checkbox'>
                            <input type="checkbox" checked={item.checked || false} id={item._id.$oid || item._id} onChange={this._handleCheckItem} />
                          </td> */}
                          <td className='text-center'>{index + 1}</td>
                          <td>{cmFunction.timestamp2DateString(item.request.timestamp.$numberLong, 'DD/MM/YYYY HH:mm:ss')}</td>
                          <td>{item.user.account}</td>
                          <td>{item.request.method}</td>
                          <td>{item.user.ip}</td>
                          <td title={item.request.originalUrl}>
                            {this._convertUrl(item.request.originalUrl)}
                          </td>
                          {/* <td>{item.email}</td>
                          <td>{item.DonVi ? item.DonVi.Ten : ''}</td>
                          <td>{item.KichHoat ? 'K??ch ho???t' : ' '}</td> */}
                          <td>
                            <Link to={'/quan-tri/log-api/' + item._id.$oid || item._id} title="Chi ti???t" className="btn btn-sm btn-outline-info border-radius"><i className="fas fa-eye"></i></Link>
                            {/* <button onClick={() => this._handleConfirmDelete(false, item._id.$oid || item._id)} title="X??a" className="btn btn-sm btn-outline-danger border-radius">
                              <i className="fas fa-trash" />
                            </button> */}
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
