  import React from 'react';
  import PropTypes from 'prop-types';
  import { useTranslation } from 'react-i18next';

  const ClientFields = ({ formData, onChange }) => {
    const { t } = useTranslation();

    return (
      <>
        <input
          name="address"
          placeholder={t('address')}
          value={formData.address}
          onChange={onChange}
          required
        />
        <input
          name="company"
          placeholder={t('company')}
          value={formData.company}
          onChange={onChange}
        />
      </>
    );
  };

  ClientFields.propTypes = {
    formData: PropTypes.shape({
      address: PropTypes.string,
      company: PropTypes.string
    }).isRequired,
    onChange: PropTypes.func.isRequired
  };

  export default ClientFields;
