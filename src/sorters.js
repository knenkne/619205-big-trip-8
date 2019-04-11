import {Sorter} from './sorter';

// Виды сортировки
const sortersNames = [`Event`, `Time`, `Price`];


// Генерируем данные о блоке сортировки
const getSorterBlockData = (names) => {
  const sorterBlockData = {
    sorters: []
  };
  for (const name of names) {
    const sorter = {
      name,
      isChecked: false
    };
    sorterBlockData.sorters.push(sorter);
  }
  return sorterBlockData;
};

// Создаем блок сортировки
const createSorterBlockElement = (sorter) => {
  const sorterComponent = new Sorter(sorter);

  // Сортируем эвенты
  sorterComponent.onSorter = (evt) => {
    const sorterName = evt.target.id;
    console.log(sorterName);
  };

  const sorterBlockElement = sorterComponent.render();
  return sorterBlockElement;
};

// Рендрим блок фильтров
const renderSorterBlockElement = (container) => {
  const sorterBlockData = getSorterBlockData(sortersNames);
  const sorterBlockElement = createSorterBlockElement(sorterBlockData);
  container.prepend(sorterBlockElement);
};

export {renderSorterBlockElement};
