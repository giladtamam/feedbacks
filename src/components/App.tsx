import RatingButton from "./RatingButton";
import FeedbackTable from "./FeedbackTable";
import { Alert, Box, CircularProgress, TextField, styled } from "@mui/material";
import { useFetchFeedback } from "../hooks/use-fetch";
import { useFilterFeedbacks } from "../hooks/use-filter";

const styles = {displayFlex: 'display: flex;'};

const RatingButtonList = styled(Box)`${styles.displayFlex}`;

const MainBox = styled(Box)`
    ${styles.displayFlex}
    padding: 10px;
`;

const Spinner = styled(CircularProgress)`
    display: flex;
    margin-left: auto;
    margin-right: auto;
`;

function App() {
    const { isLoading, feedbacks, isError } = useFetchFeedback();
    const {
        filteredFeedbacks,
        searchTerm,
        ratingButtons,
        onRatingChange,
        onSearchChange,
    } = useFilterFeedbacks(feedbacks);
    const isEmptyState = filteredFeedbacks.length === 0 && !isLoading && !isError;
    return (
        <div>
            <MainBox>
                <TextField
                    inputProps={{ "aria-label": "searchLabel" }}
                    onChange={onSearchChange}
                    value={searchTerm}
                    label="Search here"
                    variant="outlined"
                />
                <RatingButtonList>
                    {ratingButtons.map((rate, index) => (
                        <RatingButton
                            key={index}
                            onButtonClick={onRatingChange}
                            rating={index + 1}
                            isSelected={rate}
                        />
                    ))}
                </RatingButtonList>
            </MainBox>
            { isError && <Alert severity="error">Something went worng, please try again later</Alert> }
            { isEmptyState && <Alert severity="info">No feedback to show!</Alert> }
            { isLoading ? <Spinner /> : <FeedbackTable rows={filteredFeedbacks} /> }
        </div>
    );
}

export default App;
