const helper = {
  ERROR500: {
    code: 500,
    message: 'INTERNAL SERVER ERROR',
    status: false,
  },
  ERROR200: {
    code: 200,
    status: true,
  },
  ERROR400: {
    code: 400,
    status: false,
  },
  ERROR404: {
    code: 404,
    status: false,
    message: 'PAGE NOT FOUND',
  },
  ERROR401: {
    code: 401,
    status: false,
    message: 'UNAUTHORIZED',
  },
  ERROR403: {
    code: 403,
    status: false,
    message: 'DATA ALREADY EXIST',
  },
}

module.exports = helper
