import * as types from './actionTypes';
import { push } from 'react-router-redux';
import appService from '../services/appService';
import { showErrorBanner } from './errorBannerActions';

export function requestFieldMappingUpsert(status = true) {
    return {
      type: types.REQUESTING_FIELD_MAPPING_UPSERT,
      requestingFieldMappingUpsert: status
    };
}

export function requestRemoveMappedField(status = true, mappedFieldToRemove = null) {
  return {
    type: types.REQUESTING_REMOVE_MAPPED_FIELD,
    requestingRemoveMappedField: status,
    mappedFieldToRemove
  };
}

export function retrievingFields(retrievingFields = true) {
  return {
    type: types.RETRIEVING_FIELDS,
    retrievingFields
  };
}

export function fieldsRetrieved(shopifyFields, dopplerFields) {
  return {
    type: types.FIELDS_RETRIEVED,
    shopifyFields,
    dopplerFields
  };
}

export function newMappedFieldAdded({shopify, doppler}) {
  return {
    type: types.NEW_MAPPED_FIELD_ADDED,
    mapping: {shopify, doppler}
  };
}

export function mappedFieldRemoved(shopifyField) {
  return {
    type: types.MAPPED_FIELD_REMOVED,
    shopifyField
  };
}

export function settingFieldsMapping(settingFieldsMapping = true) {
  return {
    type: types.SETTING_FIELDS_MAPPING,
    settingFieldsMapping
  };
}

export function removeMappedField(shopifyField) {
  return (dispatch, getState) => {
    dispatch(mappedFieldRemoved(shopifyField))
    dispatch(requestRemoveMappedField(false, null));
  };
}

export function addNewMappedField({shopify, doppler}) {
  return (dispatch, getState) => {
    dispatch(newMappedFieldAdded({shopify, doppler}))
    dispatch(requestFieldMappingUpsert(false));
  };
}

export function getFields() {
  return (dispatch, getState) => {
    dispatch(retrievingFields(true));
    return appService.getFields()
      .then(response => {
        dispatch(retrievingFields(false));
        dispatch(fieldsRetrieved(response.shopifyFields, response.dopplerFields));
      })
      .catch(errorPromise => {
        dispatch(retrievingFields(false));
        errorPromise
          .then(msg => dispatch(showErrorBanner(true, msg)))
          .catch(err => dispatch(showErrorBanner()));
      });
  };
}

export function setFieldsMapping(fieldsMapping) {
  return (dispatch, getState) => {
    dispatch(settingFieldsMapping(true));
    return appService.setFieldsMapping(fieldsMapping)
      .then(response => {
        dispatch(settingFieldsMapping(false));
      })
      .catch(errorPromise => {
        dispatch(settingFieldsMapping(false));
        errorPromise
          .then(msg => dispatch(showErrorBanner(true, msg)))
          .catch(err => dispatch(showErrorBanner()));
      });
  };
}