import { useAppDispatch } from '../store/hooks';
import { useQuery } from 'react-query';
import Axios from '../Services/Axios';
import { setRefreshToken } from '../features';

const useSetAuthWithRefresh = () => {
    const dispatch = useAppDispatch();

    const query = useQuery('user/refresh', () => {
        const getUserData = async () => {
            try {
                const { data } = await Axios.get(
                    `${process.env.REACT_APP_API_URL}/refresh`,
                    {
                        withCredentials: true,
                    },
                );

                if (data.success) {
                    dispatch(setRefreshToken(data));
                }
            } catch (error) {
                console.log(error);
            }
        };

        getUserData();
    });
};

export default useSetAuthWithRefresh;
