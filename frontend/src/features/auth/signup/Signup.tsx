import { Container } from '@chakra-ui/react';
import { useState } from 'react';
import { Container as MainContainer } from '../../../Components/index';

import {
    StepWelcome,
    StepMobile,
    StepPassword,
    StepName,
    StepAvatar,
    StepUsername,
    StepActivate,
} from '../../index';

const Signup = () => {
    const [authSteps] = useState({
        1: StepWelcome,
        2: StepMobile,
        3: StepPassword,
        4: StepName,
        5: StepAvatar,
        6: StepUsername,
        7: StepActivate,
    });
    const [stepNumber, setStepNumber] = useState<number>(1);
    const CurrentStep = authSteps[stepNumber as keyof typeof authSteps];

    return (
        <>
            <MainContainer center={true}>
                <Container>
                    <CurrentStep
                        onClick={(event) => setStepNumber(stepNumber + 1)}
                    />
                </Container>
            </MainContainer>
        </>
    );
};

export default Signup;
