import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Page404, Other } from 'interface/screens/error';
import { BreadCrumbs, FormInput, FormWrapper } from 'interface/components';
import { __DEV__ } from '../../../common/ulti/constants';
import * as CONSTANTS from 'common/ulti/constants';
import { confirmAlert } from 'react-confirm-alert';
import * as cmFunction from 'common/ulti/commonFunction';
import * as tbDonVi from 'controller/services/tbDonViServices';
// import * as tbUsers from 'controller/services/tbUsersServices';
import * as tbUsers from 'controller/services/tbUsersServices'
import { fetchToastNotify } from '../../../controller/redux/app-reducer';

class ChiTiet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInsert: this.props.match.params.id == 0,
            error: false,
            form: {},
            donvi: [],
            donviSelected: null,
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
            let data = await tbUsers.getById(id);
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
    _handleLoadOptions = (inputValue, callback) => {
        clearTimeout(this.state.searchTimeout);
        this.state.searchTimeout = setTimeout(async () => {
            let filter = {};
            filter.page = 1;
            filter.pagesize = 1000;
            filter.count = true
            filter.sort_by = 'STT'
            filter.filter = JSON.stringify({ Ten: cmFunction.regexText(inputValue), KichHoat: true });
            filter = new URLSearchParams(filter).toString();
            let dsDonVi = await tbUsers.getAll(filter);
            dsDonVi = dsDonVi && dsDonVi._embedded ? dsDonVi._embedded : [];
            let id = this.props.match.params.id;
            let find = dsDonVi.find(ele => ele._id.$oid == id);
            find = find ? [find] : [];
            let donvi = cmFunction.convertSelectOptions(dsDonVi, '_id.$oid', 'Ten', find);
            this.state.donvi = donvi;
            this.forceUpdate();
            callback(donvi);
        }, 500);
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
        let data = await tbUsers.getAll(filter)
        return data._returned;
    }

    _handleDonViChange = (sel) => {
        this.state.donviSelected = sel;
        this.forceUpdate();
    };

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
        let axiosRes = await tbUsers.deleteById(id);
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
        let { form, donviSelected, isInsert } = this.state;
        let axiosReq = form;
        axiosReq.STT = Number(axiosReq.STT || 9999);
        axiosReq.DonViCha = null;
        axiosReq.Cap = 0;
        if (donviSelected) {
            let dvTmp = cmFunction.clone(donviSelected)
            delete dvTmp.DonViCha
            axiosReq.DonViCha = dvTmp;
            axiosReq.Cap = (dvTmp.Cap + 1)
            delete axiosReq.DonViCha.value;
            delete axiosReq.DonViCha.label;
        }

        let axiosRes;
        if (isInsert) {
            axiosRes = await tbUsers.create(axiosReq);
            console.log(axiosRes);
        } else {
            let id = this.props.match.params.id;
            axiosRes = await tbUsers.updateById(id, axiosReq);
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
        let { isInsert, form, error } = this.state;
        if (error) return <Page404 />;
        try {
            return (
                <div className="main portlet">
                    <BreadCrumbs
                        title={'Chi tiết'}
                        route={[
                            { label: 'Quản lý bảng điểm', value: '/quan-ly/bang-diem' },
                            { label: 'Thông tin bảng điểm', value: '/quan-ly/bang-diem/:id' },
                        ]}
                    />
                    <div className="portlet-title">
                        <div className="caption">
                            <i className="fas fa-grip-vertical" />
                            Thông tin bảng điểm
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
                            <span className="caption-subject">Thông tin bảng điểm</span>
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
                                            defaultValue={form.toan || ''}
                                            type="number"
                                            id="toan"
                                            label="Điểm toán"
                                            placeholder="Nhập điểm toán"
                                        />
                                    </FormWrapper>
                                    <FormWrapper>
                                        <FormInput
                                            required={true}
                                            disabled={false}
                                            readOnly={false}
                                            onChange={this._handleChangeElement}
                                            defaultValue={form.van || ''}
                                            type="number"
                                            id="van"
                                            label="Điểm văn"
                                            placeholder="Nhập điểm văn"
                                        />
                                    </FormWrapper>
                                    <FormWrapper>
                                        <FormInput
                                            required={true}
                                            disabled={false}
                                            readOnly={false}
                                            onChange={this._handleChangeElement}
                                            defaultValue={form.anh || ''}
                                            type="number"
                                            id="anh"
                                            label="Điểm tiếng anh"
                                            placeholder="Nhập điểm tiếng anh"
                                        />
                                    </FormWrapper>
                                    <FormWrapper>
                                        <FormInput
                                            required={true}
                                            disabled={false}
                                            readOnly={false}
                                            onChange={this._handleChangeElement}
                                            defaultValue={form.hoa || ''}
                                            type="number"
                                            id="hoa"
                                            label="Điểm hóa học"
                                            placeholder="Nhập điểm hóa"
                                        />
                                    </FormWrapper>
                                    <FormWrapper>
                                        <FormInput
                                            required={true}
                                            disabled={false}
                                            readOnly={false}
                                            onChange={this._handleChangeElement}
                                            defaultValue={form.ly || ''}
                                            type="number"
                                            id="ly"
                                            label="Điểm vật lý"
                                            placeholder="Nhập điểm vật lý"
                                        />
                                    </FormWrapper>
                                    <FormWrapper>
                                        <FormInput
                                            required={true}
                                            disabled={false}
                                            readOnly={false}
                                            onChange={this._handleChangeElement}
                                            defaultValue={form.sinh || ''}
                                            type="number"
                                            id="sinh"
                                            label="Điểm sinh học"
                                            placeholder="Nhập điểm sinh"
                                        />
                                    </FormWrapper>
                                    <FormWrapper>
                                        <FormInput
                                            required={true}
                                            disabled={true}
                                            readOnly={true}
                                            onChange={this._handleChangeElement}
                                            defaultValue={form.dtb = ((parseInt(form.sinh) + parseInt(form.toan) + parseInt(form.van) + parseInt(form.anh) + parseInt(form.ly) + parseInt(form.hoa)) / 7).toFixed(2) || ''}
                                            type="number"
                                            id="dtb"
                                            label="Điểm trung bình"
                                            placeholder=""
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
