import { Button, styled } from "@mui/material";
import { useCallback } from "react";

const StyledButton = styled(Button)`
    margin-left: 10px;
    min-Width: 10px;
    border-radius: 50%;
    align-self: center;
`;
interface IRatingButtonProps {
    onButtonClick?: (rating: number) => void;
    isSelected: boolean;
    rating: number
};

function RatingButton (props: IRatingButtonProps) {
    const { onButtonClick, isSelected, rating } = props;

    const buttonClicked = useCallback(() => {
        onButtonClick?.(rating);
    }, [onButtonClick, rating]);

    const variant = isSelected ? 'contained' : 'outlined';

    return (
        <StyledButton
            data-testid={onButtonClick ? `rating-button-${rating}` : ''}
            onClick={buttonClicked}
            variant={variant}>
                { rating }
        </StyledButton>
    );
}

export default RatingButton;