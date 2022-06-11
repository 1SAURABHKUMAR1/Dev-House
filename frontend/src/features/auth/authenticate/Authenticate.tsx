import { Container } from '@chakra-ui/react';
import { useState } from 'react';
import { Container as MainContainer } from '../../../Components/index';

import { StepWelcome, StepMobile, StepPassword } from '../../index';

const Signup = () => {
    const [authSteps] = useState({
        1: StepWelcome,
        2: StepMobile,
        3: StepPassword,
    });
    const [stepNumber, setStepNumber] = useState<number>(1);
    const CurrentStep = authSteps[stepNumber as keyof typeof authSteps];

    return (
        <>
            <MainContainer center={true}>
                <Container>
                    <CurrentStep
                        onClick={() => setStepNumber(stepNumber + 1)}
                    />
                </Container>
            </MainContainer>
        </>
    );
};

export default Signup;
