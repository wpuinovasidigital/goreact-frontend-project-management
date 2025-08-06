import { Paper, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';

import DatePicker from '../../../ui/Forms/DatePicker';
import Select from '../../../ui/Forms/Select';
import TextField from '../../../ui/Forms/TextField';
import dayjs from 'dayjs';

const Login = () => {
  const { control, watch } = useForm({
    defaultValues: {
      filterDate: dayjs()
    }
  });

  const username = watch('username');
  const category = watch('category');
  const filterDate = watch('filterDate');

  console.log('username:', username);
  console.log('category:', category);
  console.log('filterDate: ', filterDate);

  return (
    <Stack
      spacing={2}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100vh'}
    >
      <Paper
        sx={{
          width: 600,
          padding: 2,
        }}
      >
        <DatePicker
          name="filterDate"
          control={control}
          label={'Pilih Tanggal'}
        />
        <TextField name={'username'} control={control} label={'Username'} />
        <Select
          name={'category'}
          control={control}
          label={'Pilih Kategori'}
          options={[
            {
              value: 'Kategori 1',
              label: 'Kategori 1',
            },
            {
              value: 'Kategori 2',
              label: 'Kategori 2',
            },
            {
              value: 'Kategori 3',
              label: 'Kategori 3',
            },
          ]}
        />
      </Paper>
    </Stack>
  );
};

export default Login;
