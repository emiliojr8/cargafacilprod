import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const DriverFields = ({ formData, onChange }) => {
  const { t } = useTranslation();

  return (
    <>
      <input
        name="vehicleType"
        placeholder={t('vehicleType')}
        value={formData.vehicleType}
        onChange={onChange}
        required
      />
      <input
        name="licenseNumber"
        placeholder={t('licenseNumber')}
        value={formData.licenseNumber}
        onChange={onChange}
        required
      />
      <input
        name="capacity"
        type="number"
        placeholder={t('capacity')}
        value={formData.capacity}
        onChange={onChange}
        required
      />
    </>
  );
};

DriverFields.propTypes = {
  formData: PropTypes.shape({
    vehicleType: PropTypes.string,
    licenseNumber: PropTypes.string,
    capacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

export default DriverFields;
