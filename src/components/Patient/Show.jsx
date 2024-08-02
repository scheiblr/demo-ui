import * as React from "react";
import {
  Datagrid, 
  TextField,
  ReferenceManyField,
  SimpleShowLayout,
  Show,
  DateField,
  Pagination,
  RichTextField
} from 'react-admin';

import {
  Grid,
  Divider
} from '@mui/material';

const Obervations = (props)  => (
  <React.Fragment>
    <Show {...props}>
      <ReferenceManyField
        reference="observations"
        target="encounter_num"
        label="Visits"
        pagination={<Pagination />}
      >
        <Datagrid
          bulkActionButtons={false}
          style={{tableLayout: 'fixed'}}>
          <TextField source="dimcode" />
          <TextField source="concept_code" />
          <TextField source="value" />
        </Datagrid>
      </ReferenceManyField>
    </Show>
  </React.Fragment>
);

const PatientShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="patient_num" />
      <Divider />

      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={6}>
          <ReferenceManyField
            reference="visits"
            target="patient_num"
            label="Visits"
            pagination={<Pagination />}
          >
            <Datagrid 
              bulkActionButtons={false}
              style={{tableLayout: 'fixed'}}
              expand={<Obervations />}>
              <TextField source="encounter_num" />
              <TextField source="inout_cd" />
              <DateField source="start_date" />
              <DateField source="end_date" />
            </Datagrid>
          </ReferenceManyField>
        </Grid>
        <Grid item xs={6}>
          <ReferenceManyField
            reference="documents"
            target="patient_id"
            label="Documents"
            perPage={1}
            pagination={<Pagination rowsPerPageOptions={[1]}/>}
          >
            <Datagrid
              bulkActionButtons={false}
              rowClick={(id, basePath, record) => `${basePath}/${record.txid}/show`} 
              style={{tableLayout: 'fixed'}} >
              <RichTextField component="pre" source="document" />
            </Datagrid>
          </ReferenceManyField>
        </Grid>
      </Grid>
    </SimpleShowLayout>
  </Show>
);

export default PatientShow;