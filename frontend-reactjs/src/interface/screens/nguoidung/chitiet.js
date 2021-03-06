import React, { Component } from "react";
import { connect } from "react-redux";
import { Page404, Other } from 'interface/screens/error'
import { BreadCrumbs, FormInput, FormWrapper } from "interface/components";
import { __DEV__ } from "../../../common/ulti/constants";
import * as CONSTANTS from 'common/ulti/constants';
import { confirmAlert } from 'react-confirm-alert';
import AsyncSelect from 'react-select/async';
import * as cmFunction from 'common/ulti/commonFunction'
import * as tbUsers from 'controller/services/tbUsersServices'
import * as tbDonVi from 'controller/services/tbDonViServices'
import * as tbCapBac from 'controller/services/tbCapBacServices'
import { fetchToastNotify } from "../../../controller/redux/app-reducer";

class ChiTiet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isInsert: this.props.match.params.id == 0,
      error: false,
      form: {},
      donvi: [],
      donviSelected: null,
      capbac: [],
      capbacSelected: null,
      lop: [],
      lopSelected: null,
    }
  }

  componentDidMount() {
    this._init()
  }

  componentDidUpdate(prevProps) {
    let { match } = this.props
    if (match.params.id !== prevProps.match.params.id) {
      this._init()
    }
  }

  _init = async () => {
    this.state.isInsert = this.props.match.params.id == 0
    let id = this.props.match.params.id
    if (!this.state.isInsert) {
      let data = await tbUsers.getById(id)
      if (data) {
        delete data.pwd
        this.state.form = data
        this.state.donviSelected = cmFunction.convertSelectedOptions(data.DonVi, '_id.$oid', 'Ten')
      }
      if (!data) this.state.error = true
      this.forceUpdate()
    }
  }

  _handleChangeElement = (evt) => {
    this.state.form[evt.target.id] = evt.target.value
    this.forceUpdate()
  }

  _handleCheckAccount = async () => {
    if (!this.state.form.account) return false;
    let filter = { filter: {} };
    filter.count = true;
    filter.page = 1;
    filter.pagesize = 1;
    filter.filter['account'] = this.state.form.account;
    filter.filter = JSON.stringify(filter.filter)
    filter = new URLSearchParams(filter).toString()
    let data = await tbUsers.getAll(filter)
    return data._returned;
  }

  _handleChangeCheckElement = (evt) => {
    this.state.form[evt.target.id] = evt.target.checked
    this.forceUpdate()
  }

  //SELECT
  _handleLoadOptions = (inputValue, callback) => {
    clearTimeout(this.state.searchTimeout);
    this.state.searchTimeout = setTimeout(async () => {
      let filter = {}
      filter.page = 1
      filter.pagesize = 1000
      filter.count = true
      filter.filter = JSON.stringify({ Ten: cmFunction.regexText(inputValue), KichHoat: true });
      filter = new URLSearchParams(filter).toString()
      let dsCapBac = await tbCapBac.getAll(filter)
      dsCapBac = (dsCapBac && dsCapBac._embedded ? dsCapBac._embedded : [])
      let capbac = cmFunction.convertSelectOptions(dsCapBac, '_id.$oid', 'Ten')
      this.state.capbac = capbac

      this.state.capbac.sort(function (a, b) {
        if (a.Cap != b.Cap) {
          return a.Cap - b.Cap;
        }
        else {
          return a.STT - b.STT;
        }
      })
      this.forceUpdate()
      callback(capbac);
    }, 500);
  };

  _handleDonViChange = (sel) => {
    this.state.capbacSelected = sel
    this.forceUpdate()
  }

  _handleLoadLopOptions = (inputValue, callback) => {
    clearTimeout(this.state.searchLopTimeout);
    this.state.searchLopTimeout = setTimeout(async () => {
      let filter = {}
      filter.page = 1
      filter.pagesize = 1000
      filter.count = true
      // filter.filter = JSON.stringify({ Ten: cmFunction.regexText(inputValue), KichHoat: true });
      filter = new URLSearchParams(filter).toString()
      let dsLopHoc = await tbDonVi.getAll(filter)
      dsLopHoc = (dsLopHoc && dsLopHoc._embedded ? dsLopHoc._embedded : [])
      let lop = cmFunction.convertSelectOptions(dsLopHoc, '_id.$oid', 'Ten')
      this.state.lop = lop

      this.state.lop.sort(function (a, b) {
        if (a.Cap != b.Cap) {
          return a.Cap - b.Cap;
        }
        else {
          return a.STT - b.STT;
        }
      })
      this.forceUpdate()
      callback(lop);
    }, 500);
  };

  _handleLopChange = (sel) => {
    this.state.lopSelected = sel
    this.forceUpdate()
  }

  //ACTION
  _handleConfirm = (_type = 0, _action, _stay = false) => {
    confirmAlert({
      title: `${!_type ? 'S???a' : (_type < 0 ? 'X??a' : 'Th??m')} d??? li???u`,
      message: `X??c nh???n ${!_type ? 's???a' : (_type < 0 ? 'x??a' : 'th??m')} d??? li???u`,
      buttons: [
        {
          label: 'Kh??ng',
          onClick: () => { return }
        },
        {
          label: 'C??',
          onClick: () => _action(_stay)
        }
      ]
    });
  }

  _handleDelete = async () => {
    if (this.state.isInsert) return
    let { id } = this.props.match.params

    let { LoginRes } = this.props
    if (LoginRes._id === id) {
      this.props.dispatch(fetchToastNotify({ type: CONSTANTS.WARNING, data: "Kh??ng th??? x??a t??i kho???n c???a b???n" }))
      return
    }

    let axiosRes = await tbUsers.deleteById(id)
    if (axiosRes) {
      this.props.dispatch(fetchToastNotify({ type: CONSTANTS.SUCCESS, data: "X??a th??nh c??ng" }))
      cmFunction.goBack()
    }
  }

  _handleSave = (stay) => {
    if (cmFunction.formValidate(this, 'form')) {
      this._handleConfirm(this.state.isInsert, this._handleUpdateInfo, stay)
    } else {
      confirmAlert({
        title: 'D??? li???u kh??ng h???p l???',
        message: 'Vui l??ng nh???p ????ng ?????nh d???ng d??? li???u',
        buttons: [
          {
            label: '?????ng ??',
            onClick: () => { return }
          }
        ]
      });
      return;
    }
  }

  _handleSaveAndAuthorization = () => {
    if (cmFunction.formValidate(this, 'form')) {
      this._handleConfirm(this.state.isInsert, this._handleUpdateInfoAndAuthorization, false)
    } else {
      confirmAlert({
        title: 'D??? li???u kh??ng h???p l???',
        message: 'Vui l??ng nh???p ????ng ?????nh d???ng d??? li???u',
        buttons: [
          {
            label: '?????ng ??',
            onClick: () => { return }
          }
        ]
      });
      return;
    }
  }

  _handleUpdateInfo = async (stay) => {
    let { form, isInsert, donviSelected, capbacSelected, lopSelected } = this.state
    // form.KichHoat = false
    let axiosRes, axiosReq = cmFunction.clone(form)

    // console.log(axiosReq);

    axiosReq.CapBac = null
    if (capbacSelected) {
      axiosReq.CapBac = capbacSelected
    }

    axiosReq.Lop = null
    if (lopSelected) {
      axiosReq.Lop = lopSelected
    }

    // axiosReq.DonVi = null
    // if (donviSelected) {
    //   axiosReq.DonVi = cmFunction.clone(donviSelected)
    //   delete axiosReq.DonVi.value
    //   delete axiosReq.DonVi.label
    // }

    if (isInsert) {
      // axiosReq.KichHoat = false
      axiosRes = await tbUsers.create(axiosReq)
    } else {
      let id = this.props.match.params.id;
      axiosRes = await tbUsers.updateById(id, axiosReq)
    }
    if (axiosRes) {
      this.props.dispatch(fetchToastNotify({ type: CONSTANTS.SUCCESS, data: 'Th??nh c??ng' }))
      if (isInsert) {
        this.state.form = {}
        this.state.donviSelected = null
        this.forceUpdate()
      }
      if (!stay) cmFunction.goBack()
    }
  }

  _handleUpdateInfoAndAuthorization = async () => {
    let { form, isInsert, donviSelected } = this.state
    // form.KichHoat = false
    let axiosRes, axiosReq = cmFunction.clone(form)
    axiosReq.DonVi = null
    if (donviSelected) {
      axiosReq.DonVi = cmFunction.clone(donviSelected)
      delete axiosReq.DonVi.value
      delete axiosReq.DonVi.label
    }

    if (isInsert) {
      // axiosReq.KichHoat = false
      axiosRes = await tbUsers.create(axiosReq)
    } else {
      let id = this.props.match.params.id;
      axiosRes = await tbUsers.updateById(id, axiosReq)
    }
    if (axiosRes) {
      this.props.dispatch(fetchToastNotify({ type: CONSTANTS.SUCCESS, data: 'Th??nh c??ng' }))
      if (isInsert) {
        this.state.form = {}
        this.state.donviSelected = null
        this.forceUpdate()
      }
      this.props.history.push('/phan-quyen/phan-quyen')
      // if (!stay) cmFunction.goBack()
    }
  }

  render() {
    let { isInsert, form, error } = this.state
    let { donvi, donviSelected, capbacSelected, lopSelected } = this.state
    if (error)
      return <Page404 />
    try {
      return (
        <div className="main portlet fade-in">
          <BreadCrumbs title={"Chi ti???t"}
            route={[{ label: 'Qu???n l?? ng?????i d??ng', value: '/quan-ly/nguoi-dung' }, { label: 'Th??ng tin ng?????i d??ng', value: '/quan-ly/nguoi-dung/:id' }]}
          />
          <div className="portlet-title">
            <div className="caption">
              <i className="fas fa-grip-vertical" />Th??ng tin ng?????i d??ng
            </div>
            <div className="action">
              <button onClick={() => this._handleSave(false)} className="btn btn-sm btn-outline-primary border-radius">
                <i className="fas fa-save" />L??u
              </button>
              <button onClick={() => this._handleSave(true)} className="btn btn-sm btn-outline-primary border-radius">
                <i className="far fa-save" />L??u v?? ti???p t???c
              </button>
              <div className="btn btn-sm dropdown">
                <button className="btn btn-sm btn-outline-primary border-radius dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fas fa-share" />Kh??c
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <button onClick={cmFunction.goBack} className="btn btn-sm">
                    <i className="fas fa-reply" />Quay l???i
                  </button>
                  <button onClick={this._init} className="btn btn-sm">
                    <i className="fas fa-sync" />L??m m???i
                  </button>
                  {!isInsert && <button onClick={() => this._handleConfirm(-1, this._handleDelete)} className="btn btn-sm">
                    <i className="fas fa-trash" />
                    X??a
                  </button>}
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header d-flex justify-content-between" data-toggle="collapse" data-target="#collapseExample" aria-expanded="true" aria-controls="collapseExample">
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
                      id="name"
                      type="text"
                      required={true}
                      disabled={false}
                      readOnly={false}
                      label="T??n ng?????i d??ng"
                      placeholder="Nh???p t??n ng?????i d??ng"
                      defaultValue={form.name || ''}
                      onChange={this._handleChangeElement} />
                  </FormWrapper>
                  <FormWrapper>
                    <FormInput
                      id="account"
                      type="text"
                      required={true}
                      disabled={!isInsert}
                      readOnly={!isInsert}
                      label="T??i kho???n ng?????i d??ng"
                      placeholder="Nh???p t??i kho???n ng?????i d??ng"
                      defaultValue={form.account || ''}
                      onChange={this._handleChangeElement}
                      _handleCheck={this._handleCheckAccount} />
                  </FormWrapper>
                  <FormWrapper>
                    <FormInput
                      required={isInsert} disabled={false} readOnly={false} onChange={this._handleChangeElement}
                      defaultValue={form.pwd || ''} type="password" id="pwd" label="M???t kh???u" placeholder="Nh???p m???t kh???u" />
                  </FormWrapper>
                  <FormWrapper>
                    <FormInput
                      loadOptions={this._handleLoadLopOptions} onChange={this._handleLopChange} required={true}
                      defaultValue={lopSelected} isClearable={true} isSearchable={true} defaultOptions={true}
                      type="select" label="L???p" placeholder="Ch???n l???p ..." />
                  </FormWrapper>
                  <FormWrapper>
                    <FormInput
                      loadOptions={this._handleLoadOptions} onChange={this._handleDonViChange} required={true}
                      defaultValue={capbacSelected} isClearable={true} isSearchable={true} defaultOptions={true}
                      type="select" label="C???p" placeholder="Ch???n c???p ..." />
                  </FormWrapper>
                  <FormWrapper>
                    <FormInput parentClass="col-md-6" labelClass="col-md-6" inputClass="col-md-6"
                      required={false} disabled={false} readOnly={false} onChange={this._handleChangeElement}
                      defaultValue={form.email || ''} type="text" id="email" label="Email" placeholder="Nh???p email" />
                    <FormInput parentClass="col-md-6" labelClass="col-md-6" inputClass="col-md-6"
                      required={false} disabled={false} readOnly={false} pattern={CONSTANTS.VN_PHONE_NUMBER} onChange={this._handleChangeElement}
                      defaultValue={form.SoDienThoai || ''} type="text" id="SoDienThoai" label="S??T li??n h???" errorLabel="S??T kh??ng h???p l???" placeholder="Nh???p S??T ng?????i d??ng" />
                  </FormWrapper>
                  <FormWrapper>
                    <FormInput type="textarea" onChange={this._handleChangeElement} rows="3" defaultValue={form.GhiChu || ''} id="GhiChu" label="Ghi ch??" />
                  </FormWrapper>
                  <FormWrapper>
                    <FormInput
                      type="checkbox" onChange={this._handleChangeCheckElement}
                      defaultValue={form.KichHoat} id="KichHoat" label="K??ch ho???t" />
                  </FormWrapper>
                </div>
              </div>
              <div className="card-footer">
              </div>
            </div>
          </div>
        </div>
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
export default connect(mapStateToProps)(ChiTiet);
