const readPage = (data) => {
  const result = [];

  Object.values(data).forEach((item, index) => {
    if (index < parseInt(process.env.PAGE_LENGTH, 10) - 1) {
      const { id, title, marketing_description: description } = item;
      result.push({ id, title, description });
    }
  });
  return result;
};

module.exports = readPage;
