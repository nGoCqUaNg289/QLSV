import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Page404, Other } from 'interface/screens/error';
import { BreadCrumbs, FormInput, FormWrapper } from 'interface/components';
import { __DEV__ } from '../../../common/ulti/constants';
import * as CONSTANTS from 'common/ulti/constants';
import { confirmAlert } from 'react-confirm-alert';
import * as cmFunction from 'common/ulti/commonFunction';
import * as tbDonVi from 'controller/services/tbDonViServices';
import * as tbUsers from 'controller/services/tbUsersServices';
import * as tbMonHoc from 'controller/services/tbMonHocServices';
import * as tbChuyenNganh from 'controller/services/tbChuyenNganhServices';
import { fetchToastNotify } from '../../../controller/redux/app-reducer';

class ChiTiet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInsert: this.props.match.params.id == 0,
            error: false,
            form: {},
            donvi: [],
            giangvien: [],
            chuyennganh: [],
            chuyennganhSelected: null,
            donviSelected: null,
            giangvienSelected: null,
            searchTimeout: null,
            check: false
        };
    }

    componentDidMount() {
        this._init();
    }

    componentDidUpdate(prevProps) {
        let { match } = this.props;
        if (match.params.id !== prevProps.match.params.id) {
            this._init();
        }
    }

    _init = async () => {
        let id = this.props.match.params.id;
        this.state.isInsert = id == 0;
        if (!this.state.isInsert) {
            let data = await tbMonHoc.getById(id);
            if (data) {
                this.state.form = data;
                this.state.donviSelected = cmFunction.convertSelectedOptions(data.DonViCha, '_id.$oid', 'Ten');
            }
            if (!data) this.state.error = true;
            this.forceUpdate();
        }
    };

    _handleChangeElement = (evt) => {
        this.state.form[evt.target.id] = evt.target.value;
        this.forceUpdate();
    };

    _handleChangeCheckElement = (evt) => {
        this.state.form[evt.target.id] = evt.target.checked;
        this.forceUpdate();
    };


    //SELECT LOAD DATA
    // _handleLoadOptions = (inputValue, callback) => {
    //     clearTimeout(this.state.searchTimeout);
    //     this.state.searchTimeout = setTimeout(async () => {
    //         let filter = {};
    //         filter.page = 1;
    //         filter.pagesize = 1000;
    //         filter.count = true
    //         filter.sort_by = 'STT'
    //         filter.filter = JSON.stringify({ Ten: cmFunction.regexText(inputValue), KichHoat: true });
    //         // filter.filter.CapBac.Ten = 'Giảng viên'
    //         filter = new URLSearchParams(filter).toString();
    //         let dsDonVi = await tbMonHoc.getAll(filter);
    //         dsDonVi = dsDonVi && dsDonVi._embedded ? dsDonVi._embedded : [];
    //         let id = this.props.match.params.id;
    //         let find = dsDonVi.find(ele => ele._id.$oid == id);
    //         find = find ? [find] : [];
    //         let donvi = cmFunction.convertSelectOptions(dsDonVi, '_id.$oid', 'Ten', find);
    //         this.state.donvi = donvi;
    //         this.forceUpdate();
    //         callback(donvi);
    //     }, 500);
    // };

    // _handleChuyenNganhChange = (sel) => {
    //     this.state.donviSelected = sel;
    //     this.forceUpdate();
    // };

    _handleLoadOptions = (inputValue, callback) => {
        clearTimeout(this.state.searchTimeout);
        this.state.searchTimeout = setTimeout(async () => {
            let filter = {};
            filter.page = 1;
            filter.pagesize = 1000;
            filter.count = true
            filter.sort_by = 'STT'
            // filter.filter = JSON.stringify({ Ten: cmFunction.regexText(inputValue), KichHoat: true });
            filter = new URLSearchParams(filter).toString();
            let dsChuyenNganh = await tbChuyenNganh.getAll(filter);
            dsChuyenNganh = dsChuyenNganh && dsChuyenNganh._embedded ? dsChuyenNganh._embedded : [];
            // dsChuyenNganh.forEach(item => {
            //     if (item.CapBac.Ten == "Giảng viên") {
            //         let ListItem = [];
            //         ListItem.push(item);
            //         this.state.giangvien = ListItem;
            //     }

            // });
            let id = this.props.match.params.id;
            let find = dsChuyenNganh.find(ele => ele._id.$oid == id);
            find = find ? [find] : [];
            let chuyennganh = cmFunction.convertSelectOptions(dsChuyenNganh, '_id.$oid', 'Ten', find);
            this.state.chuyennganh = chuyennganh;
            this.forceUpdate();
            callback(chuyennganh);
        }, 500);
    };

    _handleChuyenNganhChange = (sel) => {
        this.state.chuyennganhSelected = sel;
        this.forceUpdate();
    };

    _handleCheckMaDV = async () => {
        if (!this.state.form.Ma) return false;
        let filter = { filter: {} };
        filter.count = true;
        filter.page = 1;
        filter.pagesize = 1;
        filter.filter['Ma'] = this.state.form.Ma;
        filter.filter = JSON.stringify(filter.filter)
        filter = new URLSearchParams(filter).toString()
        let data = await tbMonHoc.getAll(filter)
        return data._returned;
    }



    //ACTION
    _handleConfirm = (_type = 0, _action, _stay = false) => {
        confirmAlert({
            title: `${!_type ? 'Sửa' : _type < 0 ? 'Xóa' : 'Thêm'} dữ liệu`,
            message: `Xác nhận ${!_type ? 'sửa' : _type < 0 ? 'xóa' : 'thêm'
                } dữ liệu`,
            buttons: [
                {
                    label: 'Không',
                    onClick: () => {
                        return;
                    },
                },
                {
                    label: 'Có',
                    onClick: () => _action(_stay),
                },
            ],
        });
    };

    _handleDelete = async () => {
        if (this.state.isInsert) return;
        let { id } = this.props.match.params;
        let axiosRes = await tbMonHoc.deleteById(id);
        if (axiosRes) {
            this.props.dispatch(
                fetchToastNotify({ type: CONSTANTS.SUCCESS, data: 'Xóa thành công' })
            );
            cmFunction.goBack();
        }
    };

    _handleSave = (stay) => {
        if (cmFunction.formValidate(this, 'form')) {
            this._handleConfirm(this.state.isInsert, this._handleUpdateInfo, stay);
        } else {
            confirmAlert({
                title: 'Dữ liệu không hợp lệ',
                message: 'Vui lòng nhập đúng định dạng dữ liệu',
                buttons: [
                    {
                        label: 'Đồng ý',
                        onClick: () => {
                            return;
                        },
                    },
                ],
            });
            return;
        }
    };

    _handleUpdateInfo = async (stay) => {
        let { form, chuyennganhSelected, isInsert } = this.state;
        let axiosReq = form;

        axiosReq.STT = Number(axiosReq.STT || 9999);
        // axiosReq.DonViCha = null;
        // axiosReq.Cap = 0;
        // axiosReq.ChuNhiem = giangvienSelected.name;
        // if (donviSelected) {
        //     let dvTmp = cmFunction.clone(donviSelected)
        //     delete dvTmp.DonViCha
        //     axiosReq.DonViCha = dvTmp;
        //     axiosReq.Cap = (dvTmp.Cap + 1)
        //     delete axiosReq.DonViCha.value;
        //     delete axiosReq.DonViCha.label;
        // }
        // console.log(axiosReq);
        axiosReq.ChuyenNganh = null;
        if (chuyennganhSelected) {
            axiosReq.ChuyenNganh = chuyennganhSelected;
        }
        let axiosRes;
        if (isInsert) {
            axiosRes = await tbMonHoc.create(axiosReq);
        } else {
            let id = this.props.match.params.id;
            axiosRes = await tbMonHoc.updateById(id, axiosReq);
        }
        if (axiosRes) {
            this.props.dispatch(
                fetchToastNotify({ type: CONSTANTS.SUCCESS, data: 'Thành công' })
            );
            if (isInsert) {
                this.state.form = {};
                this.state.donviSelected = null;
                this.forceUpdate();
            }
            if (!stay) cmFunction.goBack();
        }
    };

    render() {
        let { isInsert, form, error, donviSelected, giangvienSelected, chuyennganhSelected } = this.state;
        if (error) return <Page404 />;
        try {
            return (
                <div className="main portlet">
                    <BreadCrumbs
                        title={'Chi tiết'}
                        route={[
                            { label: 'Quản lý môn học', value: '/quan-ly/mon-hoc' },
                            { label: 'Thông tin môn học', value: '/quan-ly/mon-hoc/:id' },
                        ]}
                    />
                    <div className="portlet-title">
                        <div className="caption">
                            <i className="fas fa-grip-vertical" />
                            Thông tin môn
                        </div>
                        <div className="action">
                            <button
                                onClick={() => this._handleSave(false)}
                                className="btn btn-sm btn-outline-primary border-radius"
                            >
                                <i className="fas fa-save" />
                                Lưu
                            </button>
                            <button
                                onClick={() => this._handleSave(true)}
                                className="btn btn-sm btn-outline-primary border-radius"
                            >
                                <i className="far fa-save" />
                                Lưu và tiếp tục
                            </button>
                            <div className="btn btn-sm dropdown">
                                <button
                                    className="btn btn-sm btn-outline-primary border-radius dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <i className="fas fa-share" />
                                    Khác
                                </button>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <button onClick={cmFunction.goBack} className="btn btn-sm">
                                        <i className="fas fa-reply" />
                                        Quay lại
                                    </button>
                                    <button onClick={this._init} className="btn btn-sm">
                                        <i className="fas fa-sync" />
                                        Làm mới
                                    </button>
                                    {!isInsert && (
                                        <button
                                            onClick={() =>
                                                this._handleConfirm(-1, this._handleDelete)
                                            }
                                            className="btn btn-sm"
                                        >
                                            <i className="fas fa-trash" />
                                            Xóa
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div
                            className="card-header d-flex justify-content-between"
                            data-toggle="collapse"
                            data-target="#collapseExample"
                            aria-expanded="true"
                            aria-controls="collapseExample"
                        >
                            <span className="caption-subject">Thông tin cơ bản</span>
                            <span>
                                <i className="fas fa-chevron-up" />
                                <i className="fas fa-chevron-down" />
                            </span>
                        </div>
                        <div className="collapse show" id="collapseExample">
                            <div className="card-body">
                                <div className="form-body" ref="form">
                                    <FormWrapper>
                                        <FormInput
                                            required={true}
                                            disabled={false}
                                            readOnly={false}
                                            onChange={this._handleChangeElement}
                                            defaultValue={form.Ten || ''}
                                            type="text"
                                            id="Ten"
                                            label="Tên môn học"
                                            placeholder="Nhập tên môn học"
                                        />
                                        {/* <FormInput
                                            parentClass="col-md-6"
                                            labelClass="col-md-6"
                                            inputClass="col-md-6"
                                            required={true}
                                            disabled={false}
                                            readOnly={false}
                                            onChange={this._handleChangeElement}
                                            defaultValue={form.Ma || ''}
                                            type="text"
                                            id="Ma"
                                            label="Khóa học"
                                        /> */}
                                    </FormWrapper>
                                    <FormWrapper>
                                        <FormInput
                                            loadOptions={this._handleLoadOptions}
                                            onChange={this._handleChuyenNganhChange}
                                            required={false}
                                            defaultValue={chuyennganhSelected}
                                            isDisabled={false}
                                            isClearable={true}
                                            isSearchable={true}
                                            defaultOptions={true}
                                            type="select"
                                            label="Thuộc chuyên ngành"
                                            placeholder="Chọn chuyên ngành ..."
                                        />
                                    </FormWrapper>
                                    <FormWrapper>
                                        <FormInput
                                            type="textarea"
                                            onChange={this._handleChangeElement}
                                            rows="3"
                                            defaultValue={form.GhiChu || ''}
                                            id="GhiChu"
                                            label="Ghi chú"
                                        />
                                    </FormWrapper>
                                    <FormWrapper>
                                        <FormInput
                                            type="checkbox"
                                            onChange={this._handleChangeCheckElement}
                                            defaultValue={form.KichHoat}
                                            id="KichHoat"
                                            label="Kích hoạt"
                                        />
                                    </FormWrapper>
                                </div>
                            </div>
                            <div className="card-footer"></div>
                        </div>
                    </div>
                </div>
            );
        } catch (e) {
            if (__DEV__) console.log(e);
            return <Other data={e} />;
        }
    }
}

const mapStateToProps = (state) => {
    let { LoginRes, General } = state;
    return { LoginRes, General };
};
export default connect(mapStateToProps)(ChiTiet);
