import { useLoaderData } from "react-router";
import useDetailProjectContext from "../hooks/useDetailProjectContext";
import { IconButton, Stack, Typography, Box } from "@mui/material";
import datetime from "@/utils/datetime";
import { Edit } from "@mui/icons-material";

const EditProject = () => {
    const detailProjectData = useLoaderData();
    const detailProjectContext = useDetailProjectContext();

    return (
        <Stack direction={'row'} alignItems={'center'} gap={1}>
            <Stack direction={'column'} alignItems={'flex-end'}>
                <Typography variant="body1" fontWeight={700}>
                    Durasi Proyek {
                        datetime.getDurationDays(
                            detailProjectData.created_at,
                            detailProjectData.due_date
                        )
                    } hari
                </Typography>
                <Typography variant="body1">
                    {datetime.format(detailProjectData.created_at, 'DD MMM YYYY')} - {datetime.format(detailProjectData.due_date, 'DD MMM YYYY')}
                </Typography>
            </Stack>
            <Box>
                <IconButton onClick={() => detailProjectContext.setIsOpenModalEditProject(true)}>
                    <Edit />
                </IconButton>
            </Box>
        </Stack>
    );
}

export default EditProject;