import React, { Component } from "react";
import { connect } from "react-redux";
import { Page404, Other } from 'interface/screens/error'
import { BreadCrumbs, FormWrapper, FormInput } from "interface/components";
import { __DEV__, GUEST } from "../../../common/ulti/constants";
import * as CONSTANTS from 'common/ulti/constants';
import { confirmAlert } from 'react-confirm-alert';
import AsyncSelect from 'react-select/async';
import Select from 'react-select'
import axios from 'axios'
import moment from 'moment'
import * as cmFunction from 'common/ulti/commonFunction'
import * as tbMenu from 'controller/services/tbMenuServices'
import * as tbNhomQuyen from 'controller/services/tbNhomQuyenServices'
import { fetchToastNotify } from "../../../controller/redux/app-reducer";
import { GmapAddress } from "../../components";

class ChiTiet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isInsert: this.props.match.params.id == 0,
      error: false,
      form: {},
      menu: [],
      menuSelected: null,

      nhomquyen: [],
      nhomquyenSelected: null,

      menuTimeout: null,
      nhomquyenTimeout: null
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
      let data = await tbMenu.getById(id)
      if (data) {
        delete data.pwd
        this.state.form = data
        this.state.menuSelected = cmFunction.convertSelectedOptions(data.Parent_Id, 'Id', 'Name')
        this.state.nhomquyenSelected = cmFunction.convertSelectedOptions(data.Ma, 'Ma', 'Ten')
      }
      if (!data) this.state.error = true
      this.forceUpdate()
    }
  }

  _handleChangeElement = (evt) => {
    this.state.form[evt.target.id] = evt.target.value
    this.forceUpdate()
  }

  _handleChangeCheckElement = (evt) => {
    this.state.form[evt.target.id] = evt.target.checked
    this.forceUpdate()
  }

  //SELECT
  _handleLoadOptions = (inputValue, callback) => {
    clearTimeout(this.state.menuTimeout);
    this.state.menuTimeout = setTimeout(async () => {
      let filter = {}
      filter.page = 1
      filter.pagesize = 1000
      filter.count = true
      filter.sort_by = 'STT'
      filter.filter = JSON.stringify({ Name: cmFunction.regexText(inputValue) });
      filter = new URLSearchParams(filter).toString()
      let dsMenu = await tbMenu.getAll(filter)
      dsMenu = (dsMenu && dsMenu._embedded ? dsMenu._embedded : [])
      let disabled = [];
      let { form, menuSelected } = this.state;
      if (form && !cmFunction.isEmpty(form)) disabled.push(form);
      // if (menuSelected) disabled.push(menuSelected);
      let menu = cmFunction.convertSelectOptions(dsMenu, '_id.$oid', 'Name', disabled)
      this.state.menu = menu
      this.forceUpdate()
      callback(menu);
    }, 500);
  };

  _handleLoadNhomQuyenOptions = (inputValue, callback) => {
    clearTimeout(this.state.nhomquyenTimeout);
    this.state.nhomquyenTimeout = setTimeout(async () => {
      let filter = {}
      filter.page = 1
      filter.pagesize = 1000
      filter.count = true
      filter.sort_by = 'STT'
      filter.filter = JSON.stringify({ Ten: cmFunction.regexText(inputValue) });
      filter = new URLSearchParams(filter).toString()
      let dsNhomQuyen = await tbNhomQuyen.getAll(filter)
      dsNhomQuyen = (dsNhomQuyen && dsNhomQuyen._embedded ? dsNhomQuyen._embedded : [])
      let nhomquyen = cmFunction.convertSelectOptions(dsNhomQuyen, '_id.$oid', 'Ten')
      nhomquyen.push({
        GhiChu: "Kh??ch",
        Ma: GUEST,
        STT: 9999,
        Ten: "Kh??ch",
        code: GUEST.toLowerCase(),
        label: "Kh??ch",
        value: GUEST,
      })
      this.state.nhomquyen = nhomquyen
      this.forceUpdate()
      callback(nhomquyen);
    }, 500);
  };

  _handleMenuChange = (sel) => {
    this.state.menuSelected = sel
    this.forceUpdate()
  }

  _handleNhomQuyenChange = (sel) => {
    this.state.nhomquyenSelected = sel
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
    let axiosRes = await tbMenu.deleteById(id)
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
  _handleUpdateInfo = async (stay) => {
    let { form, isInsert, menuSelected, nhomquyenSelected, Ma } = this.state
    let axiosRes, axiosReq = cmFunction.clone(form)
    axiosReq.Parent_Id = null
    axiosReq.Ma = null
    if (menuSelected) {
      axiosReq.Parent_Id = cmFunction.clone(menuSelected)
      axiosReq.STT = Number(axiosReq.STT)
      delete axiosReq.Parent_Id.value
      delete axiosReq.Parent_Id.label
    }
    if (nhomquyenSelected) {
      axiosReq.Ma = []
      nhomquyenSelected.forEach((item, index) => {
        let temp = cmFunction.clone(item)
        delete temp.value
        delete temp.label
        axiosReq.Ma.push(temp)
      })
    }

    if (isInsert) {
      axiosRes = await tbMenu.create(axiosReq)
    } else {
      let id = this.props.match.params.id;
      axiosRes = await tbMenu.updateById(id, axiosReq)
    }
    if (axiosRes) {
      this.props.dispatch(fetchToastNotify({ type: CONSTANTS.SUCCESS, data: 'Th??nh c??ng' }))
      if (isInsert) {
        this.state.form = {}
        this.state.menuSelected = null
        this.state.nhomquyenSelected = null
        this.forceUpdate()
      }
      if (!stay) cmFunction.goBack()
    }
  }


  render() {
    let { isInsert, form, error } = this.state
    let { menu, menuSelected, nhomquyenSelected } = this.state
    if (error)
      return <Page404 />
    try {
      return (
        <div className="main portlet fade-in">
          <BreadCrumbs title={"Chi ti???t"}
            route={[{ label: 'Qu???n l?? menu', value: '/quan-tri/menu' }, { label: 'Th??ng tin menu', value: '/quan-tri/menu/:id' }]}
          />
          <div className="portlet-title">
            <div className="caption">
              <i className="fas fa-grip-vertical" />Th??ng tin menu
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
                      required={true} disabled={false} readOnly={false} onChange={this._handleChangeElement}
                      defaultValue={form.Name || ''} type="text" id="Name" label="T??n hi???n th???" placeholder="Nh???p t??n hi???n th???" />
                  </FormWrapper>
                  <FormWrapper>
                    <FormInput
                      required={true} disabled={false} readOnly={false} onChange={this._handleChangeElement}
                      defaultValue={form.URL || ''} type="text" id="URL" label="URL" placeholder="Nh???p URL" />
                  </FormWrapper>
                  <FormWrapper>
                    <FormInput
                      required={true} disabled={false} readOnly={false} onChange={this._handleChangeElement}
                      defaultValue={form.Id || ''} type="number" id="Id" label="Id" placeholder="Nh???p Id" />
                    {/* <label className="col-md-3 mb-0">M??</label>
                    <input className="col-md-4 form-control" onChange={this._handleChangeElement} value={form.Ma || ''} type="text" id="Ma" placeholder="Nh???p m??" /> */}
                  </FormWrapper>
                  <FormWrapper>
                    <FormInput parentClass="col-md-6" labelClass="col-md-6" inputClass="col-md-6"
                      type="select" icon={true} label="Icon" placeholder="Ch???n icon..."
                      isClearable={true} isSearchable={true}
                      options={CONSTANTS.ICONSET}
                      defaultValue={this.state.form.Class}
                      value={this.state.form.Class}
                      onChange={(res) => { this.state.form.Class = res; this.forceUpdate() }}
                    />
                    <FormInput parentClass="col-md-6" labelClass="col-md-6" inputClass="col-md-6"
                      required={false} disabled={false} readOnly={false} onChange={this._handleChangeElement}
                      defaultValue={form.STT || ''} type="number" id="STT" label="STT" placeholder="Nh???p STT" />
                  </FormWrapper>
                  <FormWrapper>
                    {/* <label className="col-md-3 mb-0">Menu cha<span className="required">*</span></label>
                    <div className="col-md-9 pl-0 pr-0">
                      <AsyncSelect
                        className=""
                        classNamePrefix="form-control"
                        placeholder="Menu cha ..."
                        loadOptions={this._handleLoadOptions}
                        onChange={this._handleMenuChange}
                        value={menuSelected}
                        isClearable
                        isSearchable
                        defaultOptions
                      />
                    </div> */}
                    {/* <input className="col-md-9 form-control" onChange={this._handleChangeElement} value={form.DonVi || ''} type="text" id="DonVi" placeholder="Nh???p ????n v??? qu???n l??" /> */}
                    <FormInput
                      loadOptions={this._handleLoadOptions} onChange={this._handleMenuChange} required={false}
                      defaultValue={menuSelected} isClearable={true} isSearchable={true} defaultOptions={true}
                      type="select" label="Menu cha" placeholder="Ch???n menu cha ..." />
                  </FormWrapper>
                  <FormWrapper>
                    {/* <label className="col-md-3 mb-0">Quy???n hi???n th???<span className="required">*</span></label>
                    <div className="col-md-9 pl-0 pr-0">
                      <AsyncSelect
                        className=""
                        classNamePrefix="form-control"
                        placeholder="Quy???n hi???n th??? ..."
                        loadOptions={this._handleLoadNhomQuyenOptions}
                        onChange={this._handleNhomQuyenChange}
                        isMulti
                        value={nhomquyenSelected}
                        isClearable
                        isSearchable
                        defaultOptions
                      />
                    </div> */}
                    <FormInput
                      loadOptions={this._handleLoadNhomQuyenOptions} onChange={this._handleNhomQuyenChange} required={false}
                      defaultValue={nhomquyenSelected} isMulti={true} isClearable={true} isSearchable={true} defaultOptions={true}
                      type="select" label="Quy???n hi???n th???" placeholder="Quy???n hi???n th??? ..." />
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
