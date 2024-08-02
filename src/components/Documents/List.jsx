import * as React from "react";
import { 
  List, 
  Datagrid, 
  TextField
} from 'react-admin';
import SummaryTextField from './SummaryTextField';

const DocumentGrid = props => (
  <Datagrid {...props}>
    <TextField source="txid" />
    <SummaryTextField source="document" />
    <TextField source="subject.reference" label="Subject"/>
  </Datagrid>
);

const DocumentList = props => {
  return (
    <List
      actions={null}
      {...props}
    >
      <DocumentGrid 
        bulkActionButtons={false}
        style={{tableLayout: 'fixed'}} 
        rowClick="show" 
        {...props} />
    </List>
  );
}

export default DocumentList;