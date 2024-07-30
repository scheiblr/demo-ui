import React from 'react';
import { fetchUtils, Admin, Resource } from 'react-admin';
import postgrestRestProvider,
     { defaultPrimaryKeys,
       defaultSchema } from '@raphiniert/ra-data-postgrest';

import authProvider from './authProvider';

import DocumentSearch from './components/Documents/Search';
import DocumentList from './components/Documents/List';
import DocumentShow from './components/Documents/Show';
import PatientShow from './components/Patient/Show';
import PatientList from './components/Patient/List';

import Footer from './components/Footer';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
  }
  const access_token = getAccessToken();
  options.headers.set('Authorization', `Bearer ${access_token}`);
  return fetchUtils.fetchJson(url, options);
};

const config = {
  apiUrl: 'rest/',
  httpClient: httpClient,
  defaultListOp: 'eq',
  primaryKeys: new Map([
    ['documents',    ['txid']],
    ['patients', ['patient_num']],
    ['visits', ['encounter_num']]
  ]),
  schema: defaultSchema
}

const dataProvider = postgrestRestProvider(config);

const App = () => (
  <React.Fragment>
    <Admin
      title='ra-data-postgREST Demo'
      dataProvider={dataProvider}
      authProvider={authProvider}
    >
      <Resource name="zombo_document_search" options={{label: 'Search'}} list={DocumentSearch} />
      <Resource name="documents" show={DocumentShow} list={DocumentList} />
      <Resource name="patients" show={PatientShow} list={PatientList} />
      <Resource name="visits" />
      <Resource name="observations" />
      <Footer />
    </Admin>
  </React.Fragment>
);

export {App};
