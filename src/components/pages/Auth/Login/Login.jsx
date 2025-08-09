import { Button, Paper, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import AuthLayout from '@/components/layouts/AuthLayout';
import TextField from '@/components/ui/Forms/TextField';
import session from '@/utils/session';


const Login = () => {
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm();

  const onSubmit = (formValues) => {
    console.log('Login data:', formValues);
    session.setSession('dummy-token');
    navigate('/');
  };

  return (
    <AuthLayout>
      <Paper
        sx={{
          padding: 2,
          width: 500,
        }}
      >
        <Typography
          variant="h5"
          component={'h1'}
          align="center"
          marginBottom={2}
        >
          Masuk
        </Typography>
        <Stack
          flexDirection={'column'}
          gap={1}
          component={'form'}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField label={'Email'} control={control} name="email" />
          <TextField label={'Password'} control={control} name="password" />
          <Button type="submit" variant="contained" fullWidth>
            Masuk ke akun Anda
          </Button>
          <Button
            type="button"
            variant="text"
            onClick={() => navigate('/signup')}
            fullWidth
          >
            Daftar baru
          </Button>
        </Stack>
      </Paper>
    </AuthLayout>
  );
};

export default Login;
