import "bootstrap";
import "./scss/main.scss";
import Reports from "./js/models/Reports";
import { elements, renderLoader, clearLoader } from "./js/views/base";
import * as reportsView from "./js/views/reportsView";
import * as searchView from "./js/views/searchView";

const state = {};

window.addEventListener("load", () => {
  loadData();
});

const loadData = async () => {
  state.Reports = new Reports();

  renderLoader();

  await state.Reports.getData();

  const options = { years: [], tags: [] };
  state.Reports.data.forEach(item => {
    options.years.push(new Date(item.date).getFullYear());
    options.tags.push(item.category);
  });

  const years = [...new Set(options.years)].sort((a, b) => {
    return b - a;
  });
  searchView.renderYearsOptions(years);

  const tags = [...new Set(options.tags)].sort();
  searchView.renderTagsOptions(tags);

  SearchReports();
  clearLoader();
};

const prepareViewData = reports => {
  let data = reports.map(item => {
    let report = {
      datetime: dateToStringConverter(item.date),
      title: item.title,
      desc: item.description,
      category: `Raport ${item.category.toLowerCase()}`,
      files: item.files
    };
    return report;
  });
  return data;
};

const dateToStringConverter = date => {
  //TAK, WIEM - MOŻNA TO ZROBIĆ PRZEZ moment.js, ALE SZYBCIEJ TO NAPISAŁEM NIŻ BYM ZAIMPORTOWAŁ momnet.js ;)
  const dt = new Date(date);
  let strDT = {
    date: `${("0" + dt.getDate()).slice(-2)}.${(
      "0" +
      (dt.getMonth() + 1)
    ).slice(-2)}.${dt.getFullYear()}`,
    time: `${("0" + dt.getHours()).slice(-2)}:${dt.getMinutes()}`
  };
  return strDT;
};

const SearchReports = () => {
  renderLoader();
  const year = elements.yearsSelect.value;
  const text = elements.textSearch.value;
  const tags =   Array.prototype.slice.call(elements.tags).map(item => {
    if (item.checked == true) return item.value;
  });

  var reports = state.Reports.data.slice();
  console.log(reports)
  reportsView.clearResults();
  reports = reports.filter(
    x =>
      new Date(x.date).getFullYear() == year &&
      (x.title.toLowerCase().includes(text.toLowerCase()) || x.description.toLowerCase().includes(text.toLowerCase())) &&
      (!tags.includes("0") ? tags.includes(x.category) : true)
  );
  reportsView.renderReports(prepareViewData(reports));
  clearLoader();
};

elements.searchBtn.addEventListener("click", () => {
  SearchReports();
});

elements.tagAll.addEventListener("click", e => {
  Array.prototype.slice.call(elements.tags).forEach(el => {
    el.checked = false;
  });
  e.toElement.checked = true;
});
