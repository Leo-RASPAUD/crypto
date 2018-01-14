const baseUser = '/user';

const userEndpoints = {
    login: '/login',
    getUserDetails: id => `${baseUser}/${id}`,
};

export default {
    userEndpoints,
};
