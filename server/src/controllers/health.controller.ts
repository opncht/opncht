import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';

const getHealth = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send('OK');
});

export default {
  getHealth
};
