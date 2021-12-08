import React, { useState } from 'react';
import Form from '../../shared/Form'
import Input from '../../shared/Input'
import Button from '../../shared/Button'
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/Authentication/Authentication.actions';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    user: '',
    pass: ''
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target

    setForm({
      ...form,
      [name]: value
    })
  }

  

  const handleLogin = async () => {
    try {
      await dispatch(login(form))
      navigate('/')
    } catch(err: any) {
      Swal.fire(
        'Error',
        err.response?.data?.message || err.message,
        'error'
      )
    }
  }

  return <Form title='Login - AlgaStock' onSubmit={handleLogin}> 
    <Input
      label='User'
      name='user'
      value={form.user}
      onChange={handleInputChange}
      placeholder='E.g.: your_user_name321'
    />
    <Input
      label='Password'
      name='pass'
      value={form.pass}
      onChange={handleInputChange}
      type='password'
    />
    <Button>
      Login
    </Button>
  </Form>
}

export default LoginForm