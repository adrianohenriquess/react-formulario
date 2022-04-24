import React from 'react';
import { Formik, useField } from 'formik';
import * as yup from 'yup';

const Campo = props => {
  const [field, meta] = useField(props);
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      {meta.error && meta.touched ? (
        <div className='invalid-feedback'>{meta.error}</div>
      ) : null}
      <input 
        {...field}
        {...props}
        className={meta.error && meta.touched ? 'is-invalid': ''}
        />
    </div>
  )
}

const AdicionaCliente = () => {

  const esquema = yup.object({
    nome: yup.string().required('O nome é obrigatório')
                      .min(10, 'O nome deve ter no mínimo 10 caracteres')
                      .max(30, 'O nome deve ter no máximo 30 caracteres'),
    email: yup.string().required('O email é obrigatório')
                      .email('O e-mail é inválido'),
    nascimento: yup.date().required('A data de nascimento é obrigatória')
                      .max(new Date(), 'A data não pode ser futura')
  })

  return (
    <>
      <h1>Cadastro de Clientes</h1>
      <Formik initialValues={{ nome: '', email: '', nascimento: '' }}
        validationSchema={esquema}
        onSubmit={(values) => (
          alert(JSON.stringify(values))
        )}
        >
        {(props) => (
          <form noValidate onSubmit={props.handleSubmit}>
            <Campo id="nome" name="nome" type="text" label="Nome"/>
            <Campo id="email" name="email" type="email" label="E-m@il"/>
            <Campo id="nascimento" name="nascimento" type="date" label="Data de nascimento"/>
            <button type="submit">Adicionar</button>
          </form>
        )}
          
      </Formik>
    </>
  );
};

export default AdicionaCliente;
