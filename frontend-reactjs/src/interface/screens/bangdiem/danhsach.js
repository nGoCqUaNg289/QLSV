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
import * as tbDonVi from 'controller/services/tbDonViServices'
import * as tbSinhVien from 'controller/services/tbSinhVienServices'
import * as tbCapBac from 'controller/services/tbCapBacServices'
import * as tbBangDiem from 'controller/services/tbBangDiemServices'
import * as tbUsers from 'controller/services/tbUsersServices'
import * as cmFunction from 'common/ulti/commonFunction'

class DanhSach extends Component {
    constructor(props) {
        super(props)
        this.state = {
            danhsach: [],
            form: {},
            listItem: [],
            cbCheckAll: false,
            searchIsOpen: false,

            page: CONSTANTS.DEFAULT_PAGE,
            pagesize: CONSTANTS.DEFAULT_PAGESIZE,
            _size: 0,
            _total_pages: 0,
            filter: null,
        }
    }

    componentDidMount = async () => {
        this._getDanhSachDonVi(this._createFilter())
    }

    componentDidUpdate(prevProps) {
        let { location } = this.props
        if (location !== prevProps.location) {
            this._getDanhSachDonVi(this._createFilter())
        }
    }

    _createFilter = () => {
        let parsed = queryString.parse(this.props.location.search);
        let { page, pagesize, filter } = parsed
        filter = filter ? cmFunction.decode(filter) : filter
        parsed.page = parseInt(page) || CONSTANTS.DEFAULT_PAGE
        parsed.pagesize = parseInt(pagesize) || CONSTANTS.DEFAULT_PAGESIZE
        parsed.count = true
        parsed.sort_by = "STT"
        !filter ? delete parsed.filter : parsed.filter = filter
        this.state.page = parseInt(page) || CONSTANTS.DEFAULT_PAGE
        this.state.pagesize = parseInt(pagesize) || CONSTANTS.DEFAULT_PAGESIZE
        this.state.filter = filter
        this.forceUpdate()
        return new URLSearchParams(parsed).toString()
    }

    _getDanhSachDonVi = async (query) => {
        let dataUser = await tbUsers.getAll(query)
        // dataUser._embedded.forEach(user => {
        //     if (user.CapBac.Ten == 'Sinh viên') {
        //         let ListItem = []
        //         ListItem.push(user);
        //         this.state.danhsach = ListItem;
        //     }
        // })

        for (let index = 0; index < dataUser._embedded.length; index++) {
            if (dataUser._embedded[index].CapBac.Ten == 'Sinh viên') {
                this.state.listItem.push(dataUser._embedded[index])
            }
        }

        // console.log(this.state.listItem);
        this.state.danhsach = this.state.listItem && this.state.listItem ? this.state.listItem : [];
        this.state._size = this.state.listItem._size || 0
        this.state._total_pages = this.state.listItem._total_pages || 0
        this.state.cbCheckAll = false
        this.forceUpdate()
    }

    _handleConfirmDelete = (multi, id) => {
        confirmAlert({
            title: 'Xóa dữ liệu',
            message: 'Bạn muốn xóa dữ liệu',
            buttons: [
                {
                    label: 'Không',
                    onClick: () => { return }
                },
                {
                    label: 'Có',
                    onClick: () => multi ? this._handleDeleteMulti() : this._handleDeleteOne(id)
                }
            ]
        });
    }

    _handleDeleteMulti = async () => {

        let { danhsach } = this.state, axiosReq = [], count = 0
        danhsach.forEach((item, index) => {
            if (item.checked)
                axiosReq.push(tbCapBac.deleteById(item._id.$oid || item._id))
        });

        if (!axiosReq.length) return

        let axiosRes = await axios.all(axiosReq).then(axios.spread((...responses) => {
            return responses
        })).catch(errors => {
            if (__DEV__) console.log(errors)
            this.props.dispatch(fetchToastNotify({ type: CONSTANTS.ERROR, data: 'Có lỗi' }))
        })

        axiosRes.forEach((item, index) => { if (item) count++ });

        this.props.dispatch(fetchToastNotify({ type: CONSTANTS.SUCCESS, data: "Xóa thành công " + count + " dữ liệu" }))
        this._getDanhSachDonVi(this._createFilter())
    }

    _handleLockMulti = async () => {
        let { danhsach } = this.state, axiosReq = [], count = 0
        danhsach.forEach((item, index) => {
            if (item.checked)
                axiosReq.push(tbCapBac.lockById(item._id.$oid || item._id))
        });

        if (!axiosReq.length) return

        let axiosRes = await axios.all(axiosReq).then(axios.spread((...responses) => {
            return responses
        })).catch(errors => {
            if (__DEV__) console.log(errors)
            this.props.dispatch(fetchToastNotify({ type: CONSTANTS.ERROR, data: 'Có lỗi' }))
        })

        axiosRes.forEach((item, index) => { if (item) count++ });

        this.props.dispatch(fetchToastNotify({ type: CONSTANTS.SUCCESS, data: "Khóa thành công " + count + " dữ liệu" }))
        this._getDanhSachDonVi(this._createFilter())
    }

    _handleDeleteOne = async (id) => {
        let axiosRes = await tbCapBac.deleteById(id)
        if (axiosRes) {
            this.props.dispatch(fetchToastNotify({ type: CONSTANTS.SUCCESS, data: "Xóa thành công" }))
            this._getDanhSachDonVi(this._createFilter())
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
    _handleExportExcel = (ref) => {
        // ví dụ xuất excel tại bảng đang có
        let myRows = [['Tiêu đề của bảng']], maxCol = 0
        let table = ReactDOM.findDOMNode(this.refs[`${ref}`]);
        for (let tbindex = 0; tbindex < table.children.length; tbindex++) {
            let tb = table.children[`${tbindex}`]
            for (let trindex = 0; trindex < tb.children.length; trindex++) {
                let row = []
                let tr = tb.children[`${trindex}`]
                maxCol = tr.children.length > maxCol ? tr.children.length : maxCol
                for (let thindex = 0; thindex < tr.children.length; thindex++) {
                    let th = tr.children[`${thindex}`]
                    row.push(th.innerText)
                }
                myRows.push(row)
            }
        }
        // set colspan và rowspan
        let merge = [
            // { s: { r: 0, c: 0 }, e: { r: 0, c: maxCol } },
            // { s: { r: 1, c: 6 }, e: { r: 1, c: 7 } }
        ]
        // xuất file
        let ws = XLSX.utils.aoa_to_sheet(myRows);
        ws["!merges"] = merge;
        let wb = XLSX.utils.book_new();
        //add thêm nhiều Sheet vào đây cũng đc
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "DataTable.xlsx")
    }

    render() {
        let { danhsach, cbCheckAll, } = this.state
        let { page, pagesize, _size, _total_pages } = this.state
        try {
            return (
                <React.Fragment>
                    <div className="main portlet fade-in">
                        <BreadCrumbs title={"Bảng điểm sinh viên"} route={[{ label: 'Bảng điểm', value: '/bang-diem' }]} />
                        <div className="portlet-title">
                            <div className="caption">
                                <i className="fas fa-grip-vertical" />Danh sách bảng điểm sinh viên
                            </div>
                            <div className="action">
                                <button onClick={() => this._handleExportExcel('dataTable')} className="btn btn-sm btn-outline-info border-radius" title="Xuất excel">
                                    <i className="fas fa-download" />
                                </button>
                            </div>
                        </div>
                        <div className="card">
                            {/* <div className="card-header">
                                <Link to={'/quan-ly/bang-diem/0'} className="btn btn-sm btn-outline-primary border-radius">
                                    <i className="fas fa-plus" />Thêm
                                </Link>
                                <button onClick={() => this._handleConfirmDelete(true, 0)} className="btn btn-sm btn-outline-danger border-radius">
                                    <i className="fas fa-trash" />Xóa
                                </button>
                            </div> */}
                            <div className="card-body fix-first">
                                <div className="table-fix-head">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0" ref="dataTable">
                                        <thead>
                                            <tr>
                                                <th className='td-checkbox'><input type="checkbox" id='cbCheckAll' checked={cbCheckAll} onChange={this._handleCheckAll} /></th>
                                                <th>STT</th>
                                                <th>Tên sinh viên</th>
                                                <th>Điểm trung bình</th>
                                                <th>Trạng thái</th>
                                                <th>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {danhsach.map((item, index) => {
                                                return <tr key={index} >
                                                    <td className='td-checkbox'>
                                                        <input type="checkbox" checked={item.checked || false} id={item._id.$oid || item._id} onChange={this._handleCheckItem} />
                                                    </td>
                                                    <td className='text-center'>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    {/* <td>{item.DonViCha ? item.DonViCha.Ten : ""}</td> */}
                                                    {/* <td>{item.SoDienThoai}</td> */}
                                                    <td>{item.dtb || 'Chưa có điểm trung bình'}</td>
                                                    <td>{item.KichHoat ? 'Kích hoạt' : ' '}</td>
                                                    <td>
                                                        <Link
                                                            to={{
                                                                pathname:
                                                                    "/quan-ly/bang-diem/danh-sach/" + item._id.$oid || item._id,
                                                                state: { isReadOnly: true },
                                                            }}
                                                            title="Xem dữ liệu"
                                                            className="btn btn-sm btn-outline-info border-radius mr-1"
                                                        >
                                                            <i className="fas fa-eye" />
                                                        </Link>
                                                        {/* <Link to={'/quan-ly/bang-diem/danh-sach/' + item._id.$oid || item._id} title="Chi tiết điểm" className="btn btn-sm btn-outline-info border-radius"><i className="fas fa-eye" /></Link> */}
                                                        <Link to={'/quan-ly/bang-diem/' + item._id.$oid || item._id} title="Chỉnh sửa điểm" className="btn btn-sm btn-outline-info border-radius"><i className="fas fa-pencil-alt" /></Link>
                                                        <button onClick={() => this._handleConfirmDelete(false, item._id.$oid || item._id)} title="Xóa" className="btn btn-sm btn-outline-danger border-radius">
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
