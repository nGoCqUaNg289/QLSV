import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Page404, Other } from 'interface/screens/error';
import { BreadCrumbs, FormInput, FormWrapper } from 'interface/components';
import { __DEV__ } from '../../../common/ulti/constants';
import * as CONSTANTS from 'common/ulti/constants';
import { confirmAlert } from 'react-confirm-alert';
import * as cmFunction from 'common/ulti/commonFunction';
import * as tbDonVi from 'controller/services/tbDonViServices';
import * as tbChuyenNganh from 'controller/services/tbChuyenNganhServices'
import * as tbDanhMucUngDung from 'controller/services/tbDanhMucUngDungServices'
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
            let data = await tbChuyenNganh.getById(id);
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
            let dsDonVi = await tbChuyenNganh.getAll(filter);
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
        let data = await tbChuyenNganh.getAll(filter)
        return data._returned;
    }

    _handleDonViChange = (sel) => {
        this.state.donviSelected = sel;
        this.forceUpdate();
    };

    //ACTION
    _handleConfirm = (_type = 0, _action, _stay = false) => {
        confirmAlert({
            title: `${!_type ? 'S???a' : _type < 0 ? 'X??a' : 'Th??m'} d??? li???u`,
            message: `X??c nh???n ${!_type ? 's???a' : _type < 0 ? 'x??a' : 'th??m'
                } d??? li???u`,
            buttons: [
                {
                    label: 'Kh??ng',
                    onClick: () => {
                        return;
                    },
                },
                {
                    label: 'C??',
                    onClick: () => _action(_stay),
                },
            ],
        });
    };

    _handleDelete = async () => {
        if (this.state.isInsert) return;
        let { id } = this.props.match.params;
        let axiosRes = await tbChuyenNganh.deleteById(id);
        if (axiosRes) {
            this.props.dispatch(
                fetchToastNotify({ type: CONSTANTS.SUCCESS, data: 'X??a th??nh c??ng' })
            );
            cmFunction.goBack();
        }
    };

    _handleSave = (stay) => {
        if (cmFunction.formValidate(this, 'form')) {
            this._handleConfirm(this.state.isInsert, this._handleUpdateInfo, stay);
        } else {
            confirmAlert({
                title: 'D??? li???u kh??ng h???p l???',
                message: 'Vui l??ng nh???p ????ng ?????nh d???ng d??? li???u',
                buttons: [
                    {
                        label: '?????ng ??',
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
            axiosRes = await tbChuyenNganh.create(axiosReq);
            console.log(axiosRes);
        } else {
            let id = this.props.match.params.id;
            axiosRes = await tbChuyenNganh.updateById(id, axiosReq);
        }
        if (axiosRes) {
            this.props.dispatch(
                fetchToastNotify({ type: CONSTANTS.SUCCESS, data: 'Th??nh c??ng' })
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
        let { isInsert, form, error, donviSelected } = this.state;
        if (error) return <Page404 />;
        try {
            return (
                <div className="main portlet">
                    <BreadCrumbs
                        title={'Chi ti???t'}
                        route={[
                            { label: 'Qu???n l?? ????n v???', value: '/quan-ly/don-vi' },
                            { label: 'Th??ng tin ????n v???', value: '/quan-ly/don-vi/:id' },
                        ]}
                    />
                    <div className="portlet-title">
                        <div className="caption">
                            <i className="fas fa-grip-vertical" />
                            Th??ng tin ????n v???
                        </div>
                        <div className="action">
                            <button
                                onClick={() => this._handleSave(false)}
                                className="btn btn-sm btn-outline-primary border-radius"
                            >
                                <i className="fas fa-save" />
                                L??u
                            </button>
                            <button
                                onClick={() => this._handleSave(true)}
                                className="btn btn-sm btn-outline-primary border-radius"
                            >
                                <i className="far fa-save" />
                                L??u v?? ti???p t???c
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
                                    Kh??c
                                </button>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <button onClick={cmFunction.goBack} className="btn btn-sm">
                                        <i className="fas fa-reply" />
                                        Quay l???i
                                    </button>
                                    <button onClick={this._init} className="btn btn-sm">
                                        <i className="fas fa-sync" />
                                        L??m m???i
                                    </button>
                                    {!isInsert && (
                                        <button
                                            onClick={() =>
                                                this._handleConfirm(-1, this._handleDelete)
                                            }
                                            className="btn btn-sm"
                                        >
                                            <i className="fas fa-trash" />
                                            X??a
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
                            <span className="caption-subject">Th??ng tin c?? b???n</span>
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
                                            label="T??n chuy??n ng??nh"
                                            placeholder="Nh???p t??n chuy??n ng??nh"
                                        />
                                    </FormWrapper>
                                    {/* <FormWrapper>
                                        <FormInput
                                            loadOptions={this._handleLoadOptions}
                                            onChange={this._handleDonViChange}
                                            required={false}
                                            defaultValue={donviSelected}
                                            isDisabled={false}
                                            isClearable={true}
                                            isSearchable={true}
                                            defaultOptions={true}
                                            type="select"
                                            label="Tr???c thu???c"
                                            placeholder="Ch???n ????n v??? tr???c thu???c ..."
                                        />
                                    </FormWrapper>
                                    <FormWrapper>
                                        <FormInput
                                            required={false}
                                            disabled={false}
                                            readOnly={false}
                                            onChange={this._handleChangeElement}
                                            defaultValue={form.DiaChi || ''}
                                            type="text"
                                            id="DiaChi"
                                            label="?????a ch???"
                                            placeholder="Nh???p ?????a ch???"
                                        />
                                    </FormWrapper>
                                    <FormWrapper>
                                        <FormInput
                                            parentClass="col-md-6"
                                            labelClass="col-md-6"
                                            inputClass="col-md-6"
                                            required={false}
                                            disabled={false}
                                            readOnly={false}
                                            pattern={CONSTANTS.VN_PHONE_NUMBER}
                                            onChange={this._handleChangeElement}
                                            defaultValue={form.SoDienThoai || ''}
                                            type="text"
                                            id="SoDienThoai"
                                            label="S??T li??n h???"
                                            errorLabel="S??T kh??ng h???p l???"
                                            placeholder="Nh???p S??T li??n h???"
                                        />
                                        <FormInput
                                            parentClass="col-md-6"
                                            labelClass="col-md-6"
                                            inputClass="col-md-6"
                                            required={false}
                                            disabled={false}
                                            readOnly={false}
                                            pattern=""
                                            onChange={this._handleChangeElement}
                                            defaultValue={form.STT || ''}
                                            type="number"
                                            id="STT"
                                            label="STT"
                                            placeholder="Nh???p s??? th??? t???"
                                        />
                                    </FormWrapper> */}
                                    <FormWrapper>
                                        <FormInput
                                            type="textarea"
                                            onChange={this._handleChangeElement}
                                            rows="3"
                                            defaultValue={form.GhiChu || ''}
                                            id="GhiChu"
                                            label="Ghi ch??"
                                        />
                                    </FormWrapper>
                                    <FormWrapper>
                                        <FormInput
                                            type="checkbox"
                                            onChange={this._handleChangeCheckElement}
                                            defaultValue={form.KichHoat}
                                            id="KichHoat"
                                            label="K??ch ho???t"
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
