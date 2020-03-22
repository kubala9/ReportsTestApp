import { elements } from "./base";

export const clearResults = () => {
  elements.reports.innerHTML = "";
};

export const renderReports = items => {
  items.forEach((item, i) => {
    const markup = `
    <div class="report-item row">
    <div class="report-item__left-side col-2">
      <div class="report-item__date font-weight-bold">
        <span>${item.datetime.date}<br />${item.datetime.time}</span>
      </div>
      <div class="report-item__category">${item.category}</div>
    </div>
    <div class="report-item__right-side col-10">
      <div class="report-item__title"><h5 class="font-weight-bold">${item.title}</h5></div>
      <div class="report-item__desc font-weight-bold">
      ${item.desc}
      </div>
      <div class="report-item__buttons row">
        <a class="report-item__report-btn pointer col-3 col-lg-2">Zobacz Raport</a>
        <div class="col-9 col-lg-10">${renderFilesButton(item.files, i)}</div>
      </div>
    </div>
   </div>
     `;

    elements.reports.insertAdjacentHTML("beforeend", markup);
    renderFilesButton(item.files);
  });
};

const renderFilesButton = (files, i) => {
  var markup = "";
  if (files.length > 1)
    markup = `<a class="report-item__report-btn pointer" data-toggle="collapse" href="#files-${i}" role="button" aria-expanded="false" aria-controls="files-${i}">Pliki do pobrania (${files.length}) <span>&#8628;</span></a>
    <div class="collapse report-item__files-list" id="files-${i}">${renderFilesList(files)}</div>
    `;
  else if (files.length == 1)
    markup = `<a class="report-item__report-btn pointer">Pobierz ${files[0].filename} (${files[0].filesize} kB)</a>`;

  return markup;
};

const renderFilesList = files => {
  var markup = "";
  files.forEach((file) => {
    markup += `<a class="report-item__report-btn pointer">${file.filename} (${file.filesize} kB)</a>`;
  });

  return markup;
};
