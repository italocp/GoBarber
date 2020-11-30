import React, { useCallback, useRef } from 'react';
import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import { useToast } from '../../hooks/Toast';
import Button from '../../components/button';
import Input from '../../components/input';
import {
  AnimationContainer,
  Container,
  Content,
  ContentBackground,
} from './styles';
import LogoImg from '../../assets/logo.svg';
import getValidationsErrors from '../../utils/getValidationsErrors';

interface SingUpFormData {
  user: string;
  email: string;
  password: string;
}

const SingUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SingUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = yup.object().shape({
          name: yup.string().required('Nome obrigatorio'),
          email: yup
            .string()
            .required('E-mail obrigatorio')
            .email('Digite um e-mail valido'),
          password: yup.string().min(6, 'No minimo 6 digitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        history.push('/');

        addToast({
          type: 'sucess',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu login',
        });
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errors = getValidationsErrors(err);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao fazer o cadastro, cheque os dados inseridos',
        });
      }
    },
    [addToast, history],
  );

  return (
    <>
      <Container>
        <ContentBackground />
        <Content>
          <AnimationContainer>
            <img src={LogoImg} alt="GoBarber Logo" />
            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu cadastro</h1>
              <Input name="name" icon={FiUser} placeholder="Nome" />
              <Input name="email" icon={FiMail} placeholder="E-mail" />
              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />
              <Button type="submit">Cadastrar</Button>
            </Form>
            <Link to="/">
              <FiArrowLeft />
              Voltar para o login
            </Link>
          </AnimationContainer>
        </Content>
      </Container>
    </>
  );
};

export default SingUp;
