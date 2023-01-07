import { Avatar } from "@mui/material"
import styled from "styled-components"
import { useRecipient } from "../../core/hooks/useRecipient"

type Props = ReturnType<typeof useRecipient>

const StyledAvatar = styled(Avatar)`
    margin: 0px 15px 0 0
`

function RecipientAvatar({ recipient, recipientEmail }: Props) {
    return (

        recipient?.photoURL ? <StyledAvatar src={recipient.photoURL} /> :
            <StyledAvatar>{recipientEmail && recipientEmail[0].toUpperCase()}</StyledAvatar>

    )
}

export default RecipientAvatar