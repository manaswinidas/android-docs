import GithubSlugger from 'github-slugger';

const slugger = new GithubSlugger();

function removeDuplicateUsingFilter(arr) {
  let uniqueArray = arr.filter(function(elem, index, self) {
    return index == self.indexOf(elem);
  });
  return uniqueArray;
}

export function getCategoriesForProduct(examplesByProduct) {
  const allPossibleCategories = examplesByProduct.map(example => {
    return example.topic;
  });
  slugger.reset();
  const uniqueCategories = removeDuplicateUsingFilter(allPossibleCategories)
    .filter(category => {
      return category !== undefined;
    })
    .map(category => {
      return {
        title: category,
        path: '#' + slugger.slug(category)
      };
    });

  return uniqueCategories;
}
