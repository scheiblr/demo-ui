import * as React from "react";
import { Card as MuiCard, CardContent } from '@mui/material';
import { withStyles } from '@mui/styles';
import { 
  List, 
  Datagrid, 
  TextField, 
  FilterLiveSearch,
  useRecordContext
} from 'react-admin';

const Card = withStyles(theme => ({
  root: {
      [theme.breakpoints.up('sm')]: {
          order: -1, // display on the left rather than on the right of the list
          width: '25em',
          marginRight: '1em',
      },
      [theme.breakpoints.down('sm')]: {
          display: 'none',
      },
  },
}))(MuiCard);

const FilterSidebar = props => (
  <Card>
      <CardContent>
          <FilterLiveSearch source="query" label="Search" />
      </CardContent>
  </Card>
);

const TextFieldHighlights = ({source}) => {
  const record = useRecordContext();
  return (<div dangerouslySetInnerHTML={{__html:record && record[source].join(' ... ')}} />);
};

const DocumentGrid = props => (
  <Datagrid {...props}>
    <TextField source="txid" />
    <TextFieldHighlights source="search_text_highlighted" label="Content" />
    <TextField source="entry_type" label="Type" />
  </Datagrid>
);

const DocumentSearch = props => {
  return (
    <List
      empty={false}
      aside={<FilterSidebar search={true} />}
      bulkActionButtons={false}
      actions={null}
      sort={{field: 'score', order: 'DESC'}}
      {...props}
    >
      <DocumentGrid 
        rowClick={(id, basePath, record) => `${record.entry_type}/${record.txid}/show`}
        {...props} />
    </List>
  )
}

export default DocumentSearch;