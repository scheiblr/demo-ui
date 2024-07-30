import * as React from "react";
import { 
  Show, 
  SimpleShowLayout, 
  TextField,
  RichTextField
} from 'react-admin';

const DocumentTitle = ({ record }) => {
  return <span>Document {record ? `"${record.txid}"` : ''}</span>;
};

const DocumentShow = (props) => {
  return (
    <Show  {...props} title={<DocumentTitle/>}>
      <SimpleShowLayout>
        <TextField source="txid" />
        <RichTextField component="pre" source="document" />
        <TextField source="subject.reference" />
        <TextField source="resource" label="FHIR Resource"/>
      </SimpleShowLayout>
    </Show>
  );
}

export default DocumentShow;