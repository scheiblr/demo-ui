import * as React from "react";
import { TextField, useRecordContext } from 'react-admin';

const SummaryTextField = ({source, ...rest}) => {
  const record = useRecordContext();

  return (
    <TextField 
      {...rest} 
      record={{[source]: record && record[source].substring(0,125) + ' ...'}} 
      component="pre" 
      source="document" 
      label="Content" />
    );
};

export default SummaryTextField;
