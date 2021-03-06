import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Page404, Other } from 'interface/screens/error';
import { BreadCrumbs, FormInput, FormWrapper } from 'interface/components';
import { __DEV__ } from '../../../common/ulti/constants';
import * as CONSTANTS from 'common/ulti/constants';
import { confirmAlert } from 'react-confirm-alert';
import AsyncSelect from 'react-select/async';
import * as cmFunction from 'common/ulti/commonFunction';
import * as tbDanhMucUngDung from 'controller/services/tbDanhMucUngDungServices';
import { fetchToastNotify } from '../../../controller/redux/app-reducer';

class ChiTiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInsert: this.props.match.params.id == 0,
      error: false,
      form: {},

      danhmuc: [],
      danhmucSelected: null,

      searchTimeout: null,
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
    this.state.isInsert = this.props.match.params.id == 0;
    let id = this.props.match.params.id;
    if (!this.state.isInsert) {
      let data = await tbDanhMucUngDung.getById(id);
      if (data) {
        this.state.form = data;
        this.state.danhmucSelected = {
          Ma: CONSTANTS.MA_DANH_MUC[data.MaDanhMuc].Ma,
          Ten: CONSTANTS.MA_DANH_MUC[data.MaDanhMuc].Ten,
          value: CONSTANTS.MA_DANH_MUC[data.MaDanhMuc].Ma,
          label: CONSTANTS.MA_DANH_MUC[data.MaDanhMuc].Ten,
        };
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
  
  //SELECT
  _handleLoadOptions = (inputValue, callback) => {
    clearTimeout(this.state.searchTimeout);
    this.state.searchTimeout = setTimeout(async () => {
      let danhmuc = cmFunction.converDanhSachMaDanhMuc();
      this.state.danhmuc = danhmuc;
      this.forceUpdate();
      callback(danhmuc);
    }, 100);
  };

  _handleDanhMucChange = (sel) => {
    this.state.danhmucSelected = sel;
    this.forceUpdate();
  };
  //ACTION
  _handleConfirm = (_type = 0, _action, _stay = false) => {
    confirmAlert({
      title: `${!_type ? 'S???a' : _type < 0 ? 'X??a' : 'Th??m'} d??? li???u`,
      message: `X??c nh???n ${
        !_type ? 's???a' : _type < 0 ? 'x??a' : 'th??m'
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
    let axiosRes = await tbDanhMucUngDung.deleteById(id);
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
    let { form, danhmucSelected, isInsert } = this.state;
    let axiosRes,
      axiosReq = form;
    axiosReq.STT = Number(axiosReq.STT || 9999);
    if (danhmucSelected) {
      axiosReq.MaDanhMuc = danhmucSelected.Ma;
    }

    if (isInsert) {
      axiosRes = await tbDanhMucUngDung.create(axiosReq);
    } else {
      let id = this.props.match.params.id;
      axiosRes = await tbDanhMucUngDung.updateById(id, axiosReq);
    }
    if (axiosRes) {
      this.props.dispatch(
        fetchToastNotify({ type: CONSTANTS.SUCCESS, data: 'Th??nh c??ng' })
      );
      if (isInsert) {
        this.state.form = {};
        this.state.danhmucSelected = null;
        this.forceUpdate();
      }
      if (!stay) cmFunction.goBack();
    }
  };

  render() {
    let { isInsert, form, error, danhmucSelected } = this.state;
    if (error) return <Page404 />;
    try {
      return (
        <div className="main portlet fade-in">
          <BreadCrumbs
            title={'Chi ti???t'}
            route={[
              { label: 'Qu???n l?? d??? li???u d??ng chung', value: '/quan-tri/danh-muc-ung-dung' },
              { label: 'Th??ng tin d??? li???u d??ng chung', value: '/quan-tri/danh-muc-ung-dung/:id' },
            ]}
          />
          <div className="portlet-title">
            <div className="caption">
              <i className="fas fa-grip-vertical" />
              Th??ng tin d??? li???u d??ng chung
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
              <div className="card-body ">
                <div className="form-body" ref="form">
                  <FormWrapper>
                    <FormInput
                      parentClass="col-md-6"
                      labelClass="col-md-6"
                      inputClass="col-md-6"
                      required={true}
                      disabled={false}
                      readOnly={false}
                      onChange={this._handleChangeElement}
                      defaultValue={form.Ten || ''}
                      type="text"
                      id="Ten"
                      label="T??n d??? li???u d??ng chung"
                      placeholder="Nh???p t??n d??? li???u d??ng chung"
                    />
                    <FormInput
                      parentClass="col-md-6"
                      labelClass="col-md-6"
                      inputClass="col-md-6"
                      required={true}
                      disabled={!isInsert}
                      readOnly={!isInsert}
                      onChange={this._handleChangeElement}
                      defaultValue={form.Ma || ''}
                      type="text"
                      id="Ma"
                      label="M?? d??? li???u d??ng chung"
                    />
                  </FormWrapper>
                  {/* <div className="form-row form-group form-custom">
                    <label className="col-md-3 mb-0">
                      Nh??m d??? li???u d??ng chung<span className="required">*</span>
                    </label>
                    <div className="col-md-9 pl-0 pr-0">
                      <AsyncSelect
                        className=""
                        classNamePrefix="form-control"
                        placeholder="Nh??m d??? li???u d??ng chung ..."
                        loadOptions={this._handleLoadOptions}
                        onChange={this._handleDanhMucChange}
                        value={danhmucSelected}
                        isClearable
                        isSearchable={false}
                        defaultOptions
                      />
                    </div>
                  </div> */}
                  <FormWrapper>
                    <FormInput
                      loadOptions={this._handleLoadOptions}
                      onChange={this._handleDanhMucChange}
                      required={true}
                      defaultValue={danhmucSelected}
                      isClearable={true}
                      isSearchable={true}
                      defaultOptions={true}
                      type="select"
                      label="Nh??m d??? li???u d??ng chung"
                      placeholder="Nh??m d??? li???u d??ng chung ..."
                    />
                  </FormWrapper>
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
              <div className="card-footer" />
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
