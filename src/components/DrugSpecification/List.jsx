import * as React from "react";
import { 
  Filter,
  FilterLiveSearch,
  SelectInput,
  List, 
  Datagrid, 
  TextField,
  CreateButton,
  TopToolbar,
  NumberField,
  ExportButton
} from 'react-admin';


const DrugSpecificationListActions = ({ basePath }) => (
  <TopToolbar>
      <CreateButton />
      <ExportButton />
  </TopToolbar>
);

const DrugSpecificationList = props => {
  return (
    <List
    //   filters={<PatientFilter/>}
      actions={<DrugSpecificationListActions />}
      {...props}
    >
      <Datagrid rowClick="show" bulkActionButtons={true} {...props}>
        <NumberField source="id" label="id" display={false}/>
        <TextField source="atc" label="ATC" />
        <TextField source="name" label="Dummy Name" />
        <TextField source="description" label="Description" />
      </Datagrid>
    </List>
  )
}

export default DrugSpecificationList;