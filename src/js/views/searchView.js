import { elements } from "./base";

export const renderYearsOptions = years => {
  years.forEach(el => {
    const markup = `
  <option value="${el}">${el}</option>`;
    elements.yearsSelect.insertAdjacentHTML("beforeend", markup);
  });
};

export const renderTagsOptions = tags => {
  tags.forEach((el, i) => {
    const markup = `
    <div class="tag">
      <input type="checkbox" id="tag-${i+1}" name="tags" value=${el} class="tag__input fromData"/>
      <label for="tag-${i + 1}">${el}</label>         
      <span class="close-icon">x</span> 
    </div>`;
    elements.tagsBox.insertAdjacentHTML("beforeend", markup);

    document.querySelector(`#tag-${i+1}`).addEventListener("click", (e) => {
      if (Array.prototype.slice.call(elements.tags).filter(ch => ch.checked==true).length > 0) 
        elements.tagAll.checked = false;
      else
        elements.tagAll.checked = true;
   });
  });
};
