import { datatype, date, random } from 'faker';
import { Task } from 'data/models';
import { taskStatusChoices } from 'server/utils/constants/fieldChoices';
import { dateToUTC, getRandomValueFromArray } from 'server/utils/functions';
import { buildUser, createUser } from './user.factory';
import { buildProject, createProject } from './project.factory';

const buildTask = async (taskFks) => {
  const resTask = {};
  let { project } = taskFks;
  let { creator } = taskFks;
  let { assignedPrimary } = taskFks;
  const { assignedSecondary } = taskFks;
  const { parentTask } = taskFks;

  resTask.title = random.word().slice(0, 20);
  resTask.body = random.word().slice(0, 1000);
  resTask.dueDate = dateToUTC(date.past()).format('YYYY-MM-DD');
  resTask.status = getRandomValueFromArray(taskStatusChoices);
  resTask.creation = dateToUTC(date.past()).format(
    'YYYY-MM-DDTHH:mm:ss[.000Z]'
  );
  resTask.priority = datatype.number({ min: 1, max: 5 });
  resTask.storyPoint = datatype.float();

  if (taskFks.project === null || typeof taskFks.project === 'undefined') {
    const fakeProject = await buildProject({});
    const createdFakeProject = await createProject(fakeProject);
    project = createdFakeProject.projectName;
  }
  if (taskFks.creator === null || typeof taskFks.creator === 'undefined') {
    const fakeCreator = await buildUser({});
    const createdFakeCreator = await createUser(fakeCreator);
    creator = createdFakeCreator.id;
  }
  if (
    taskFks.assignedPrimary === null ||
    typeof taskFks.assignedPrimary === 'undefined'
  ) {
    const fakeAssignedPrimary = await buildUser({});
    const createdFakeAssignedPrimary = await createUser(fakeAssignedPrimary);
    assignedPrimary = createdFakeAssignedPrimary.id;
  }
  resTask.project = project;
  resTask.creator = creator;
  resTask.assignedPrimary = assignedPrimary;
  resTask.assignedSecondary = assignedSecondary;
  resTask.parentTask = parentTask;

  return resTask;
};

const createTask = async (fakeTask) => {
  const task = await Task.create(fakeTask);
  return task;
};

export { buildTask, createTask };
