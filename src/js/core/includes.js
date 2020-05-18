import $ from "jquery";

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
          loadIncludes(item);
        },
      });
    });
}

loadIncludes();
