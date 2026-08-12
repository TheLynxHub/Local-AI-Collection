/* eslint max-len: 0 */

import {DataItem} from '../../../../../../src/common/types/plugins/modules';

const idap: DataItem = {
  category: 'LDAP',
  items: [
    {
      name: 'ENABLE_LDAP',
      description: 'Enables or disables LDAP authentication.',
      type: 'CheckBox',
      defaultValue: false,
    },
    {
      name: 'LDAP_SERVER_LABEL',
      description: 'Sets the label of the LDAP server.',
      type: 'Input',
    },
    {
      name: 'LDAP_SERVER_HOST',
      description: 'Sets the hostname of the LDAP server.',
      type: 'Input',
      defaultValue: 'localhost',
    },
    {
      name: 'LDAP_SERVER_PORT',
      description: 'Sets the port number of the LDAP server.',
      type: 'Input',
      defaultValue: 389,
    },
    {
      name: 'LDAP_ATTRIBUTE_FOR_MAIL',
      description: 'Sets the attribute to use as mail for LDAP authentication.',
      type: 'Input',
    },
    {
      name: 'LDAP_ATTRIBUTE_FOR_USERNAME',
      description: 'Sets the attribute to use as a username for LDAP authentication.',
      type: 'Input',
    },
    {
      name: 'LDAP_APP_DN',
      description: 'Sets the distinguished name for the LDAP application.',
      type: 'Input',
    },
    {
      name: 'LDAP_APP_PASSWORD',
      description: 'Sets the password for the LDAP application.',
      type: 'Input',
    },
    {
      name: 'LDAP_SEARCH_BASE',
      description: 'Sets the base to search for LDAP authentication.',
      type: 'Input',
    },
    {
      name: 'LDAP_SEARCH_FILTER',
      description: 'Sets a single filter to use for LDAP search. Alternative to `LDAP_SEARCH_FILTERS`.',
      type: 'Input',
    },
    {
      name: 'LDAP_SEARCH_FILTERS',
      description: 'Sets the filter to use for LDAP search.',
      type: 'Input',
    },
    {
      name: 'LDAP_USE_TLS',
      description: 'Enables or disables TLS for LDAP connection.',
      type: 'CheckBox',
      defaultValue: true,
    },
    {
      name: 'LDAP_CA_CERT_FILE',
      description: 'Sets the path to the LDAP CA certificate file.',
      type: 'Input',
    },
    {
      name: 'LDAP_VALIDATE_CERT',
      description: 'Sets whether to validate the LDAP CA certificate.',
      type: 'CheckBox',
    },
    {
      name: 'LDAP_CIPHERS',
      description: 'Sets the ciphers to use for LDAP connection.',
      type: 'Input',
      defaultValue: 'ALL',
    },
    {
      name: 'ENABLE_LDAP_GROUP_MANAGEMENT',
      description: 'Enables the group management feature.',
      type: 'CheckBox',
      defaultValue: false,
    },
    {
      name: 'ENABLE_LDAP_GROUP_CREATION',
      description: 'If a group from LDAP does not exist in Open WebUI, it will be created automatically.',
      type: 'CheckBox',
      defaultValue: false,
    },
    {
      name: 'LDAP_ATTRIBUTE_FOR_GROUPS',
      description:
        "Specifies the LDAP attribute that contains the user's group memberships. `memberOf` is a standard attribute for this purpose in Active Directory environments.",
      type: 'Input',
      defaultValue: 'memberOf',
    },
  ],
};

export default idap;
