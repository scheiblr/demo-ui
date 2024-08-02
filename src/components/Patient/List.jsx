import * as React from "react";
import { 
  Filter,
  FilterLiveSearch,
  SelectInput,
  List, 
  Datagrid, 
  TextField,
  DateField,
  DateInput,
  TopToolbar,
  NumberField,
  ExportButton
} from 'react-admin';

const PatientFilter = (props) => (
  <Filter {...props}>
      <FilterLiveSearch label="Search" source="patient_num" alwaysOn />
      <SelectInput 
        source="sex" 
        label="Gender" 
        defaultValue="F"
        choices={[
          { name: 'male', id: 'M'},
          { name: 'female', id: 'F'},
        ]}
      />
      <DateInput source="birth_date" />
  </Filter>
);

const PatientListActions = ({ basePath }) => (
  <TopToolbar>
      <PatientFilter context="button" />
      <ExportButton />
  </TopToolbar>
);

const PatientList = props => {
  return (
    <List
      filters={<PatientFilter/>}
      actions={<PatientListActions />}
      {...props}
    >
      <Datagrid rowClick="show" bulkActionButtons={false} {...props}>
        <TextField source="patient_num" label="Patient No" />
        <TextField source="name" label="Dummy Name" />
        <TextField source="sex" label="Gender" />
        <DateField source="birth_date" label="Birth Date" />
        <NumberField source="doc_count" label="#Documents" />
      </Datagrid>
    </List>
  )
}

export default PatientList;