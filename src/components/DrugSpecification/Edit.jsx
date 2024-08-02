import { Edit, SimpleForm, TextInput, required } from 'react-admin';

export const DrugSpecificationEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled label="Id" source="id" />
            <TextInput source="atc" validate={required()} />
            <TextInput multiline source="name" validate={required()} />
            <TextInput source="description" validate={required()} />
        </SimpleForm>
    </Edit>
);

export default DrugSpecificationEdit;