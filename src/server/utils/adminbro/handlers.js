import error from '@admin-bro/sequelize/build/utils/create-validation-error';
import { populator } from 'admin-bro/lib/backend/utils';

const customNew = async (request, response, context) => {
  const { resource, h, currentAdmin, translateMessage } = context;
  if (request.method === 'post') {
    const record = await resource.build(request.payload ? request.payload : {});
    try {
      const { payload } = request;
      const newRecord = await resource.SequelizeModel.create(payload);
      record.params = newRecord.toJSON();
    } catch (e) {
      record.errors = error(e).propertyErrors;
    }
    const [populatedRecord] = await populator([record]);
    // eslint-disable-next-line no-param-reassign
    context.record = populatedRecord;
    if (record.isValid()) {
      return {
        redirectUrl: h.resourceUrl({
          // eslint-disable-next-line no-underscore-dangle
          resourceId: resource._decorated?.id() || resource.id(),
        }),
        notice: {
          message: translateMessage('successfullyCreated', resource.id()),
          type: 'success',
        },
        record: record.toJSON(currentAdmin),
      };
    }
    const pkName = resource.SequelizeModel.primaryKeyAttribute;
    delete context.record.params[pkName];
    context.record.populated = {};
    return {
      record: record.toJSON(currentAdmin),
      notice: {
        message: translateMessage('thereWereValidationErrors', resource.id()),
        type: 'error',
      },
    };
  }
  throw new Error('new action can be invoked only via `post` http method');
};

export { customNew };
