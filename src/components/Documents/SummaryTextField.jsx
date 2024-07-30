import * as React from "react";
import { TextField } from 'react-admin';

const SummaryTextField = ({source, record, ...rest}) => (
  <TextField 
    {...rest} 
    record={{...record, [source]: record[source].substring(0,125) + ' ...'}} 
    component="pre" 
    source="document" 
    label="Content" />
);

export default SummaryTextField;
