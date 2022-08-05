import { Box, Flex, Text } from '@chakra-ui/react';
import { AuthButton } from 'Components';
import { SingleIcon } from 'features';

import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <>
            <Flex
                marginTop={{
                    ssm: '3rem',
                    mmd: '4.5rem',
                    md: '5rem',
                }}
                flexDirection={{ ssm: 'column', md: 'row' }}
            >
                <Box
                    width="100%"
                    padding={{
                        ssm: '0rem',
                        sm: '1rem 2rem',
                    }}
                >
                    <Text
                        textAlign="center"
                        fontSize={{
                            ssm: '1.8rem',
                            sm: '2.2rem',
                            mmd: '2.8rem',
                            md: '3rem',
                        }}
                        fontWeight="700"
                        maxW={{
                            sm: '23rem',
                            mmd: '25rem',
                            md: '29rem',
                        }}
                        margin="auto"
                        lineHeight={{ sm: '1.2', md: '120%' }}
                        fontFamily="'Work Sans', 'sans-serif'"
                        letterSpacing="-0.025em"
                        color="#334155"
                    >
                        Where teams build faster , together
                    </Text>
                    <Text
                        textAlign="center"
                        fontSize={{ ssm: '0.8rem', sm: '1rem' }}
                        maxW={{
                            sm: '23rem',
                            mmd: '25rem',
                            md: '29rem',
                        }}
                        margin="auto"
                        color="#334155"
                        marginTop={{
                            ssm: '1.2rem',
                            sm: '1.6rem',
                        }}
                        padding="0rem 0.5rem"
                    >
                        Create, and share with collaborative code platform for
                        rapid web development.
                    </Text>

                    <Flex
                        as="section"
                        margin="auto"
                        justifyContent="center"
                        gap="0.9rem"
                        marginTop={{
                            ssm: '1rem',
                            sm: '2rem',
                            md: '3rem',
                        }}
                        flexWrap="wrap"
                    >
                        <SingleIcon iconName="cpp" />
                        <SingleIcon iconName="javascript" />
                        <SingleIcon iconName="react" />
                        <SingleIcon iconName={'PYTHON'.toLowerCase()} />
                    </Flex>

                    <Box width="100%" marginTop="2rem">
                        <AuthButton
                            buttonText="</> Start coding now"
                            marginTop="0rem"
                            onClick={() => navigate('/code-box')}
                            margin="auto"
                            padding="0rem 1rem"
                        />
                    </Box>
                </Box>
            </Flex>
        </>
    );
};

export default Header;
