import { Create, SimpleForm, TextInput, required } from 'react-admin';

export const DrugSpecificationCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput disabled label="Id" source="id" />
            <TextInput source="atc" validate={required()} />
            <TextInput multiline source="name" validate={required()} />
            <TextInput source="description" validate={required()} />
        </SimpleForm>
    </Create>
);

export default DrugSpecificationCreate;