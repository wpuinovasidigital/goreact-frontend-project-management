import { Paper, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';

import Select from '../../../ui/Forms/Select';

const Login = () => {
  const { control } = useForm();
  return (
    <Stack
      spacing={2}
      alignItems={'center'}
      justifyContent={'center'}
      sx={{ height: '100vh' }}
    >
      <Paper sx={{ width: 600, padding: 2 }}>
        <Select
          name={'kategori'}
          control={control}
          label={'Pilih Kategori'}
          options={[
            {
              label: 'Kategori 1',
              value: 'Kategori 1',
            },
            {
              label: 'Kategori 2',
              value: 'Kategori 2',
            },
            {
              label: 'Kategori 3',
              value: 'Kategori 3',
            },
          ]}
        />
      </Paper>
    </Stack>
  );
};

export default Login;
