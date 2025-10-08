import { BASE_URL } from '@/utils/network';
import useTaskAttachments from '../hooks/useTaskAttachments';
import Upload from '@/components/ui/Forms/Upload';
import { getFileExtension, getFileName } from '@/utils/attachment';

import {
  PictureAsPdf,
  Check,
  Close,
  Delete,
  Image,
  Article,
} from '@mui/icons-material';
import {
  Stack,
  Typography,
  IconButton,
  Box,
  Button,
  colors,
} from '@mui/material';

const TaskAttachments = () => {
  const {
    taskDetailData,
    formTaskAttachment,
    isShowConfirmDeleteTaskAttachment,
    setShowConfirmDeleteTaskAttachment,
    isLoading,
    onSubmitTaskAttachment,
    onDeleteTaskAttachment,
  } = useTaskAttachments();

  const renderIcon = (fileUrl) => {
    const extension = getFileExtension(fileUrl);
    if (/png/.test(extension)) return <Image />;
    if (/pdf/.test(extension)) return <PictureAsPdf />;
    return <Article />;
  };

  return (
    <Stack gap={2}>
      <Typography variant="h5" fontWeight={700}>
        Lampiran (Attachment)
      </Typography>
      <Stack gap={2}>
        {taskDetailData?.attachments?.map((item) => (
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{
              border: `1px solid ${colors.grey[300]}`,
              height: 80,
              borderRadius: 1,
              p: 1,
            }}
          >
            <Stack
              direction={'row'}
              justifyContent={'flex-start'}
              alignItems={'center'}
              gap={2}
            >
              {renderIcon(item.file)}
              <Typography
                variant="body2"
                component={'a'}
                sx={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: colors.grey[700],
                  ':hover': {
                    color: colors.blue[600],
                  },
                }}
                href={`${BASE_URL}/files/${getFileName(item.file)}`}
                target="_blank"
              >
                {getFileName(item.file)}
              </Typography>
            </Stack>
            <Box>
              {isShowConfirmDeleteTaskAttachment.show &&
              isShowConfirmDeleteTaskAttachment?.item?.public_id ===
                item.public_id ? (
                <Stack direction={'row'} gap={1}>
                  <IconButton
                    size="small"
                    color="success"
                    onClick={() => onDeleteTaskAttachment(item.public_id)}
                  >
                    <Check />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() =>
                      setShowConfirmDeleteTaskAttachment({
                        show: false,
                        item: null,
                      })
                    }
                  >
                    <Close />
                  </IconButton>
                </Stack>
              ) : (
                <IconButton
                  size="small"
                  color="error"
                  onClick={() =>
                    setShowConfirmDeleteTaskAttachment({
                      show: true,
                      item,
                    })
                  }
                >
                  <Delete />
                </IconButton>
              )}
            </Box>
          </Stack>
        ))}
      </Stack>
      <Stack
        gap={1}
        component={'form'}
        onSubmit={formTaskAttachment.handleSubmit(onSubmitTaskAttachment)}
      >
        <Upload
          control={formTaskAttachment.control}
          name={'attachments'}
          accept=".pdf, .jpg, .png"
        />
        {formTaskAttachment.formState.isValid && (
          <Stack direction={'row'} justifyContent={'flex-end'} gap={1}>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              loading={isLoading}
              size="small"
            >
              Simpan
            </Button>

            <Button
              type="button"
              variant="outlined"
              onClick={() => formTaskAttachment.setValue('attachments', [])}
              disabled={isLoading}
              size="small"
            >
              Batal
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default TaskAttachments;
