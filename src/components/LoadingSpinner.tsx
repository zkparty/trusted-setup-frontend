import styled, { keyframes } from "styled-components";

const LoadingSpinner = () => {
    return (
        <SpinnerContainer>
            <SpinnerLoading></SpinnerLoading>
        </SpinnerContainer>
    );
}

const Spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;
const SpinnerLoading = styled.div`
    width: 50px;
    height: 50px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid ${({ theme }) => theme.loader};
    border-color: ${({ theme }) => theme.loader} transparent ${({ theme }) => theme.loader} transparent;

    animation: ${Spin} 1.5s linear infinite;
`;
const SpinnerContainer = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    height: 80px;
`;

export default LoadingSpinner;