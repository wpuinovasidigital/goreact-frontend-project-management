import {Popover, Typography, Avatar as BaseAvatar} from '@mui/material'


const Avatar = ({
    label,
    text,
    onClick
}) => {
    return (
        <>
            <BaseAvatar onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}></BaseAvatar>
        </>
    )
}

export default Avatar;