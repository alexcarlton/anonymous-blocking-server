const initialDataValue = {
  sessions: {
    byUserId: {},
  },
  schedules: {
    byUserId: {},
  },
};

const deepClone = (object) => JSON.parse(JSON.stringify(object));

let data = deepClone(initialDataValue);

const resetData = () => {
  data = deepClone(initialDataValue);
};

export { data, resetData };
