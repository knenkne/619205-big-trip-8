// Блок фильтров
export const filtersBlock = document.querySelector(`.trip-filter`);

// Генерируем отдельный фильтр
const getFilterElement = (name, isDisabled = false, isChecked = false) => {
  const checkedAttribute = isChecked ? ` checked` : ``;
  const disabledAttribute = isDisabled ? ` disabled` : ``;
  const idAttribute = name.toLowerCase();
  return `
        <input type="radio" id="filter-${idAttribute}" name="filter" value="${idAttribute}" ${checkedAttribute} ${disabledAttribute}>
        <label class="trip-filter__item" for="filter-${idAttribute}">${name.toUpperCase()}</label>
      `;
};


// Вставляем фильтр в блок
export const pasteFilterElement = (name, isDisabled = false, isChecked = false) => {
  filtersBlock.insertAdjacentHTML(`beforeend`, getFilterElement(name, isDisabled, isChecked));
};
