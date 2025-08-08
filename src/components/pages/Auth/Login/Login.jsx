import { Paper, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';

import DatePicker from '@/components/ui/Forms/DatePicker';
import Select from '@/components/ui/Forms/Select';
import TextField from '@/components/ui/Forms/TextField';

const Login = () => {
  const { control, watch } = useForm({
    defaultValues: {
      filterDate: dayjs(),
    },
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
