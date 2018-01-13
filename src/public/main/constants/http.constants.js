const json = {
    type: 'json',
    value: 'application/json',
};

const formData = {
    type: 'formData',
    value: 'multipart/form-data; boundary="--boundary--"',
};

const requestTypes = {
    post: 'POST',
    get: 'GET',
    patch: 'PATCH',
};

const contentType = 'Content-Type';

export default {
    json,
    formData,
    requestTypes,
    contentType,
};
