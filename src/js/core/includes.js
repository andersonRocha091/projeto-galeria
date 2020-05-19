import $ from "jquery";

const loadHtmlSuccessCallbacks = [];

export function onLoadHtmlSuccess(callback) {
  if (!loadHtmlSuccessCallbacks.includes(callback)) {
    loadHtmlSuccessCallbacks.push(callback);
  }
}

function loadIncludes(parent) {
  if (!parent) parent = "body";

  $(parent)
    .find("[wm-include]")
    .each((index, item) => {
      const url = $(item).attr("wm-include");
      $.ajax({
        url,
        success(data) {
          $(item).html(data);
          $(item).removeAttr("wm-include");
          loadHtmlSuccessCallbacks.forEach(callback => callback(data));
          loadIncludes(item);
        },
      });
    });
}

loadIncludes();
